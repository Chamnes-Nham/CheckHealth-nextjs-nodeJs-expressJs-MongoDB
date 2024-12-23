import { UserModel, IUser } from "../models/user.model";

export class UserRepository {
  public async createUser(userData: IUser): Promise<IUser> {
    try {
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      console.error("Error in UserRepository createUser:", error);
      throw error;
    }
  }

  public async findUserByUserId(userId: string): Promise<IUser | null> {
    return UserModel.findOne({ userId });
  }

  public async updateUser(
    userId: string,
    userData: Partial<IUser>,
  ): Promise<IUser | null> {
    return UserModel.findOneAndUpdate({ userId }, userData, { new: true });
  }
}
