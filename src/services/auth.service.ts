import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { passwordService } from "./password.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      await User.create({ ...data, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authService = new AuthService();
