import { Schema, model } from "mongoose";

// Define the IReminder interface
// types.ts

export interface IReminder {
  id: string;
  title: string;
  time: string;
  date: Date;
  days: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReminderCreationParams {
  title: string;
  time?: string;
  date?: string;
  days: string[];
}

// Define the Mongoose schema
const ReminderSchema: Schema = new Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  days: { type: [String], required: true },
  isOn: { type: Boolean, default: false },
});

// Pre-save hook to update `updatedAt` before saving
ReminderSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Export the model
export const Reminder = model<IReminder>("Reminder", ReminderSchema);
