import { Controller, Route, Response, Post, Body, Get, Path, Put } from "tsoa";
import { IUser } from "@/src/models/user.model";
import { UserService } from "@/src/services/user.service";

@Route("users")
export class ProductController extends Controller {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }
  //create user
  @Post("/")
  @Response(201, "Create user successfully")
  public async createUser(@Body() userData: IUser) {
    try {
      const user = await this.userService.createUser(userData);
      return { message: "User created successfully", user };
    } catch (error) {
      this.setStatus(500);
      return { message: "Error creating user", error };
    }
  }
  // find user by there id
  @Get("/{userId}")
  @Response(200, "User Found or Created")
  public async getUserByUserId(
    @Path() userId: string
  ): Promise<IUser | { message: string }> {
    try {
      const user = await this.userService.findUserById(userId);
      return user;
    } catch (error) {
      this.setStatus(500);
      return { message: `Error retrieving or creating user: ${error}` };
    }
  }
  // update user information
  @Put("/{userId}")
  @Response(200, "User Updated Successfully")
  public async updateUser(
    @Path() userId: string,
    @Body() userData: Partial<IUser>
  ): Promise<IUser | { message: string }> {
    try {
      const updatedUser = await this.userService.updateUser(userId, userData);
      if (!updatedUser) {
        this.setStatus(404);
        return { message: "User not found" };
      }
      return updatedUser;
    } catch (error) {
      this.setStatus(500);
      return { message: `Error updating user: ${error}` };
    }
  }
}
