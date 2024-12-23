import { Schema, model } from "mongoose";

export interface IBMI {
  weight: number;
  height: number;
  age: number;
  gender: string;
  bmi?: number;
  category?: string;
  username: string;
  createdDate?: string;
  createdTime?: string;
}

const BMISchema = new Schema<IBMI>({
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bmi: { type: Number },
  category: { type: String },
  username: { type: String, required: true },
  createdDate: {
    type: String,
    default: () => new Date().toLocaleDateString("en-GB"),
  },
  createdTime: {
    type: String,
    default: () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
});

export const BMIModel = model<IBMI>("BMI", BMISchema);
