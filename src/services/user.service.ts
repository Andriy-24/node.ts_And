import { User } from "../models";
import { userRepository } from "../repositories";
import { IUser } from "../types";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await User.find().select("-password");
  }
  public async create(data: IUser): Promise<IUser> {
    return await userRepository.create(data);
  }
  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
}

export const userService = new UserService();
