import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models";
import { userService } from "../services";
import { IUser } from "../types";
import { UserValidator } from "../validators";

class UserController {
  public async findAll(
    _req: Request,
    res: Response
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const createdUser = await userService.create(value);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
  public async findById(
    req: Request,
    res: Response
  ): Promise<Response<IUser[]>> {
    try {
      const user = await User.findById(req.params.id);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const { id } = req.params;
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" }
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(
    req: Request,
    res: Response
  ): Promise<Response<void>> {
    try {
      const { id } = req.params;
      await User.deleteOne({ _id: id });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
