import {
  BadRequestError,
  InternalServerError,
  ValidationError,
} from "@/src/utils/errors/customErrors";
import { IReminder } from "../models/reminder.model";
import { Reminder } from "../models/reminder.model"; // Ensure this path is correct
import mongoose from "mongoose";

export class ReminderRepository {
  // Create a new reminder
  public async create(data: Partial<IReminder>): Promise<IReminder> {
    try {
      const newReminder = new Reminder({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newReminder.save();
      return newReminder;
    } catch (error) {
      throw error;
    }
  }

  // Read all reminders
  public async findAll(): Promise<IReminder[]> {
    try {
      return Reminder.find().exec();
    } catch (error) {
      throw error;
    }
  }

  // Read a reminder by ID
  public async findById(id: string): Promise<IReminder | any> {
    try {
      if (!id) {
        throw new ValidationError("ID is required");
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid ID format");
      }
      const response = await Reminder.findById(id).exec();
      if (!response) {
        throw new BadRequestError("Reminder not found ");
      }
    } catch (error: any) {
      if (
        error instanceof BadRequestError ||
        error instanceof ValidationError
      ) {
        throw error;
      } else {
        throw new InternalServerError(error.message);
      }
    }
  }

  // Update a reminder by ID
  public async updateById(
    id: string,
    data: Partial<IReminder>
  ): Promise<IReminder | null> {
    return Reminder.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete a reminder by ID
  public async deleteById(id: string): Promise<IReminder | null> {
    return Reminder.findByIdAndDelete(id).exec();
  }
}
