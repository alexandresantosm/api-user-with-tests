import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import "dotenv/config";
import { routes } from "./routes/routes";
import { ExistsUserError } from "./errors/ExistsUserError";

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof ExistsUserError) {
      return response.status(400).json({
        status: "error",
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    });
  }
);

export { app };
