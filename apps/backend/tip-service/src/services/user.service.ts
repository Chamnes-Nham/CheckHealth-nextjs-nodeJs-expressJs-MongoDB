import { UserRepository } from "@/src/repositories/user.repository";
import { IUser } from "../models/user.model";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  //create user
  public async createUser(userData: IUser): Promise<IUser> {
    try {
      return await this.userRepository.createUser(userData);
    } catch (error) {
      console.error("Error in UserService createUser:", error);
      throw error;
    }
  }
  // find user by there id
  public async findOrCreateUserByUserId(userId: string): Promise<IUser> {
    let user = await this.userRepository.findUserByUserId(userId);
    if (!user) {
      // Create a new user with minimal information
      const newUserData: IUser = {
        userId: userId,
        // Add other default values as needed
      };
      user = await this.createUser(newUserData);
    }
    return user;
  }
  // update user information
  public async updateUser(
    userId: string,
    userData: Partial<IUser>,
  ): Promise<IUser | null> {
    return this.userRepository.updateUser(userId, userData);
  }
}
