import mongoose, { Schema } from "mongoose";

export interface IUser {
  userId: string;
  name?: string;
  gender?: string;
  age?: number;
  weight?: number;
  height?: number;
  profile_image?: string;
}

// Define the schema for a User
const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: Number, required: false },
  weight: { type: Number, required: false },
  height: { type: Number, required: false },
  profile_image: { type: String, required: false },
});

// Create a Mongoose model
export const UserModel = mongoose.model<IUser>("checkme", userSchema);
