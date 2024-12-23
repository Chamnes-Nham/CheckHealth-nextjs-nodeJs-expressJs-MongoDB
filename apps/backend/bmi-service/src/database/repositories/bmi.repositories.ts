import { BMIModel } from "../models/bmi.model";

export class BMIRepository {
  public async createTip(
    categorizedTips: string,
    description: string,
    guideline: { title: string; content: string }[],
    should_do: { title: string; content: string }[],
    should_not: { title: string; content: string }[]
  ) {
    const newTip = new BMIModel({
      categorizedTips,
      description,
      guideline,
      should_do,
      should_not
    });
    return await newTip.save();
  }

  public async getTips() {
    return await BMIModel.find();
  }
}
