import { BMIModel } from "../database/models/bmi.model";

export class BMIService {
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
      should_not,
    });
    return newTip.save();
  }

  public async getTips() {
    return  BMIModel.find();
  }
}
