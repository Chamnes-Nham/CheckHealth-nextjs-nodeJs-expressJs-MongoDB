
import { HealthTipModel, IHealthTip } from "@/src/models/healthTip.model";
import mongoose from 'mongoose';

export class HealthTipRepository {
  public async createHealthTip(requestBody: IHealthTip): Promise<IHealthTip> {
    try {
      const newHealthTip = new HealthTipModel(requestBody);
      await newHealthTip.save();
      return newHealthTip.toObject() as IHealthTip;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`HealthTip creation failed: ${error.message}`);
      }
      throw new Error('HealthTip creation failed: Unknown error occurred');
    }
  }

  public async getAllHealthTips(category?: string): Promise<IHealthTip[]> {
    try {
      const filter = category ? { category } : {};
      const healthTips = await HealthTipModel.find(filter).lean();
      return healthTips.map(tip => ({
        ...tip,
        _id: tip._id.toString(),
      })) as IHealthTip[];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve health tips: ${error.message}`);
      }
      throw new Error('Failed to retrieve health tips: Unknown error occurred');
    }
  }

  public async getHealthTipById(healthTipId: string): Promise<IHealthTip> {
    if (!mongoose.Types.ObjectId.isValid(healthTipId)) {
      throw new Error(`Invalid ID format: ${healthTipId}`);
    }

    try {
      const healthTip = await HealthTipModel.findById(healthTipId).lean();
      if (!healthTip) {
        throw new Error(`HealthTip with ID ${healthTipId} not found`);
      }
      return { ...healthTip, _id: healthTip._id.toString() } as IHealthTip;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve health tip: ${error.message}`);
      }
      throw new Error('Failed to retrieve health tip: Unknown error occurred');
    }
  }

  public async updateHealthTipById(
    healthTipId: string,
    requestBody: Partial<IHealthTip>
  ): Promise<IHealthTip> {
    if (!mongoose.Types.ObjectId.isValid(healthTipId)) {
      throw new Error(`Invalid ID format: ${healthTipId}`);
    }

    try {
      const updatedHealthTip = await HealthTipModel.findByIdAndUpdate(
        healthTipId,
        requestBody,
        { new: true }
      ).lean();
      if (!updatedHealthTip) {
        throw new Error(`HealthTip with ID ${healthTipId} not found`);
      }
      return { ...updatedHealthTip, _id: updatedHealthTip._id.toString() } as IHealthTip;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update health tip: ${error.message}`);
      }
      throw new Error('Failed to update health tip: Unknown error occurred');
    }
  }

  public async deleteHealthTipById(healthTipId: string): Promise<IHealthTip> {
    if (!mongoose.Types.ObjectId.isValid(healthTipId)) {
      throw new Error(`Invalid ID format: ${healthTipId}`);
    }

    try {
      const deletedHealthTip = await HealthTipModel.findByIdAndDelete(healthTipId).lean();
      if (!deletedHealthTip) {
        throw new Error(`HealthTip with ID ${healthTipId} not found`);
      }
      return { ...deletedHealthTip, _id: deletedHealthTip._id.toString() } as IHealthTip;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete health tip: ${error.message}`);
      }
      throw new Error('Failed to delete health tip: Unknown error occurred');
    }
  }
}
