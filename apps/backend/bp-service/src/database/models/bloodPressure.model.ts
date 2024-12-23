import { Schema, model } from 'mongoose';

const BloodPressureTipSchema = new Schema(
  {
    categorizedTips: { 
      type: String, 
      required: true,
      enum: ['ខ្សោយ', 'ធម្មតា', 'ត្រៀមលើស', 'លើសកម្រិត ១', 'លើសកម្រិត ២'],
    },
    description: { type: String, required: true },
    guideline: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    should_do: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    should_not: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const BloodPressureTipModel = model('BloodPressureTip', BloodPressureTipSchema);
