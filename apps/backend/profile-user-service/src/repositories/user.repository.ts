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

  public async findUserByUserId(
    userId: string
  ): Promise<IUser | undefined | null> {
    try {
      const response = UserModel.findOne({ userId });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateUser(
    userId: string,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const response = UserModel.findOneAndUpdate({ userId }, userData, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
