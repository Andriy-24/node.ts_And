import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { userRouter } from "./routers";
import {ApiError} from "./errors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRUD - create, read, update, delete

app.use("/users", userRouter);
app.use((error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  return res.status(status).json(error.message);
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});
