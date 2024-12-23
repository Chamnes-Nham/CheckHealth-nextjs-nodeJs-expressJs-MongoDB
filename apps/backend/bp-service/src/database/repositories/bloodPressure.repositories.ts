import { BloodPressureTipModel } from "../models/bloodPressure.model";

export class BloodPressureTipRepository {
  public async createTip(
    categorizedTips: string,
    description: string,
    guideline: { title: string; content: string }[],
    should_do: { title: string; content: string }[],
    should_not: { title: string; content: string }[]
  ) {
    const newTip = new BloodPressureTipModel({
      categorizedTips,
      description,
      guideline,
      should_do,
      should_not
    });
    return await newTip.save();
  }

  public async getTips() {
    return await BloodPressureTipModel.find();
  }
}
