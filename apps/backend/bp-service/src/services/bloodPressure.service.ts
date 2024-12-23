import { BloodPressureTipModel } from "../database/models/bloodPressure.model";

export class BloodPressureTipService {
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
      should_not,
    });
    return newTip.save();
  }

  public async getTips() {
    return BloodPressureTipModel.find();
  }
}
