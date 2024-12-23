// import { Schema, model } from "mongoose";

// const BMISchema = new Schema(
//   {
//     categorizedTips: {
//       type: String,
//       required: true,
//       enum: [
//         'ស្គមខ្លាំងណាស់',
//         'ស្គមខ្លាំង',
//         'ស្គម',
//         'សុខភាពល្អ',
//         'លើសទម្ងន់',
//         'លើសទម្ងន់ខ្លាំង',
//         'លើសទម្ងន់ខ្លាំងណាស់',
//         'ធាត់ខ្លាំងណាស់',
//       ],
//     },
//     description: { type: String, required: true },
//     guideline: [
//       {
//         title: { type: String, required: true },
//         content: { type: String, required: true },
//       },
//     ],
//     should_do: [
//       {
//         title: { type: String, required: true },
//         content: { type: String, required: true },
//       },
//     ],
//     should_not: [
//       {
//         title: { type: String, required: true },
//         content: { type: String, required: true },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const BMIModel = model("BMI", BMISchema);

import { Schema, model } from 'mongoose';

const BMISchema = new Schema({
  categorizedTips: { type: String, required: true },
  description: { type: String, required: true },
  guideline: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ],
  should_do: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ],
  should_not: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
});

export const BMIModel = model('BMI', BMISchema);
