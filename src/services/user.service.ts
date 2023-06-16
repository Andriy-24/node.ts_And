import { User } from "../models";
import { IUser } from "../types";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await User.find().select("-password");
  }
  public async create(data: IUser): Promise<IUser> {
    return await User.create({ ...data });
  }
  public async findById(data: IUser): Promise<IUser> {
    return await User.findById({ ...data });
  }
}

export const userService = new UserService();
