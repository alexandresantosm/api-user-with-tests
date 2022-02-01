const NodeEnvironment = require("jest-environment-node");
const { v4: uuid } = require("uuid");
const { execSync } = require("child_process");
const { resolve } = require("path");
const { Client } = require("pg");

const prismaCLI = "./node_modules/.bin/prisma";

require("dotenv").config({
  path: resolve(__dirname, "..", ".env.test"),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code_schema_${uuid()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    // Execute prisma migrations
    execSync(`${prismaCLI} migrate dev`);
  }

  async teardown() {
    const clientPostgres = new Client({
      connectionString: this.connectionString,
    });

    await clientPostgres.connect();
    await clientPostgres.query(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`
    );
    await clientPostgres.end();
  }
}

module.exports = CustomEnvironment;
