import { BMIModel, IBMI } from '../models/bmi.model';

export class BMIRepository {
  async findLatest(username: string): Promise<IBMI | null> {
    return await BMIModel.findOne({ username }).sort({ createdDate: -1, createdTime: -1 }).exec();
  }
  
  async createBMI(data: Partial<IBMI>): Promise<IBMI> {
    const bmiRecord = new BMIModel(data);
    return await bmiRecord.save();
  }
  
  async getAllBMI(username: string): Promise<IBMI[]> {
    return await BMIModel.find({ username }).exec();
  }

  async getBMIById(id: string, username: string): Promise<IBMI | null> {
    return await BMIModel.findOne({ _id: id, username }).exec();
  }

  async deleteBMI(id: string, username: string): Promise<void> {
    await BMIModel.findOneAndDelete({ _id: id, username }).exec();
  }
}
