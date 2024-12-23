import { BloodPressure, BloodPressureModel } from "../models/bloodpressure.model";

export class BloodPressureRepository {
  public async create(data: Partial<BloodPressure>): Promise<BloodPressure> {
    const bloodPressure = new BloodPressureModel(data);
    return bloodPressure.save();
  }

  public async findLatest(username: string): Promise<BloodPressure | null> {
    return await BloodPressureModel.findOne({ username }) 
      .sort({ date: -1, time: -1 })
      .exec();
  }

  public async findAll(username: string): Promise<BloodPressure[]> {
    return BloodPressureModel.find({ username }) 
      .sort({ date: -1, time: -1 })
      .exec();
  }

  public async deleteById(id: string, username: string): Promise<BloodPressure | null> {
    return BloodPressureModel.findOneAndDelete({ _id: id, username }).exec(); 
  }
}
