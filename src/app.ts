import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { ApiError } from "./errors";
import { authRouter, userRouter } from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRUD - create, read, update, delete

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(
  (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message, status: error.status });
  }
);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});
