
import mongoose from "mongoose";
import { HealthTip } from "../models/HealthTip";
import { IHealthTip } from "../interfaces/IhealthTip";

export class HealthTipServices {
  public async createHealthTip(data: IHealthTip): Promise<IHealthTip> {
    try {
      const healthTip = new HealthTip(data);
      const savedHealthTip = await healthTip.save();
      return savedHealthTip.toObject() as IHealthTip; 
    } catch (error) {
      throw new Error(`Failed to create health tip: ${(error as Error).message}`);
    }
  }

  public async getAllHealthTips(category?: string): Promise<IHealthTip[]> {
    try {
      const filter = category ? { category } : {};
      const healthTips = await HealthTip.find(filter).lean();
      return healthTips as IHealthTip[]; 
    } catch (error) {
      throw new Error(`Failed to retrieve health tips: ${(error as Error).message}`);
    }
  }

  public async getHealthTipById(healthTipId: string): Promise<IHealthTip> {
    if (!mongoose.isValidObjectId(healthTipId)) {
      throw new Error(`Invalid HealthTip ID: ${healthTipId}`);
    }

    try {
      const healthTip = await HealthTip.findById(healthTipId).lean();
      if (!healthTip) {
        throw new Error("HealthTip not found");
      }
      return healthTip as IHealthTip; 
    } catch (error) {
      throw new Error(`Failed to retrieve health tip: ${(error as Error).message}`);
    }
  }

  public async updateHealthTipById(
    healthTipId: string,
    data: Partial<IHealthTip>
  ): Promise<IHealthTip> {
    if (!mongoose.isValidObjectId(healthTipId)) {
      throw new Error(`Invalid HealthTip ID: ${healthTipId}`);
    }

    try {
      const updatedHealthTip = await HealthTip.findByIdAndUpdate(healthTipId, data, {
        new: true,
      }).lean();
      if (!updatedHealthTip) {
        throw new Error("HealthTip not found or could not be updated");
      }
      return updatedHealthTip as IHealthTip; // Explicitly cast the result to IHealthTip
    } catch (error) {
      throw new Error(`Failed to update health tip: ${(error as Error).message}`);
    }
  }

  public async deleteHealthTipById(healthTipId: string): Promise<IHealthTip> {
    if (!mongoose.isValidObjectId(healthTipId)) {
      throw new Error(`Invalid HealthTip ID: ${healthTipId}`);
    }

    try {
      const deletedHealthTip = await HealthTip.findByIdAndDelete(healthTipId).lean();
      if (!deletedHealthTip) {
        throw new Error("HealthTip not found or could not be deleted");
      }
      return deletedHealthTip as IHealthTip; 
    } catch (error) {
      throw new Error(`Failed to delete health tip: ${(error as Error).message}`);
    }
  }
}

