import { BloodPressureRepository } from "../databases/repositories/bloodpressure.repository";
import { BloodPressure } from "../databases/models/bloodpressure.model";
import { format } from "date-fns";

export class BloodPressureService {
  private bloodPressureRepo = new BloodPressureRepository();

  public async createBloodPressure(systolic: number, diastolic: number, username: string): Promise<BloodPressure> {
    try {
      const { color, status } = this.determineBloodPressureStatus(systolic, diastolic);
      const formattedDate = format(new Date(), 'dd MMMM yyyy');
      const formattedTime = format(new Date(), 'HH:mm');

      return await this.bloodPressureRepo.create({
        systolic,
        diastolic,
        color,
        status,
        date: formattedDate,
        time: formattedTime,
        username // Include username
      });
    } catch (error) {
      console.error(`Error creating blood pressure record for user: ${username}`, error);
      throw new Error('Failed to create blood pressure record. Please try again later.');
    }
  }

  public async getLatestBloodPressure(username: string): Promise<BloodPressure | null> {
    try {
      return await this.bloodPressureRepo.findLatest(username);
    } catch (error) {
      console.error(`Error fetching latest blood pressure record for user: ${username}`, error);
      throw new Error('Failed to fetch latest blood pressure record. Please try again later.');
    }
  }

  public async getBloodPressureHistory(username: string): Promise<BloodPressure[]> {
    try {
      return await this.bloodPressureRepo.findAll(username);
    } catch (error) {
      console.error(`Error fetching blood pressure history for user: ${username}`, error);
      throw new Error('Failed to fetch blood pressure history. Please try again later.');
    }
  }

  public async deleteBloodPressure(id: string, username: string): Promise<BloodPressure | null> {
    try {
      return await this.bloodPressureRepo.deleteById(id, username);
    } catch (error) {
      console.error(`Error deleting blood pressure record with id: ${id} for user: ${username}`, error);
      throw new Error('Failed to delete blood pressure record. Please try again later.');
    }
  }

  private determineBloodPressureStatus(systolic: number, diastolic: number): { color: string; status: string } {
    if ((systolic > 50 && systolic <= 90) || (diastolic > 50 && diastolic <= 60)) {
      return { color: "#B0FFD2", status: "ខ្សោយ" }; // Weak
    } else if (systolic >= 90 && systolic <= 120 && diastolic >= 60 && diastolic <= 80) {
      return { color: "#00FF6F", status: "សុខភាពល្អ" }; // Healthy
    } else if ((systolic > 120 && systolic <= 130) || (diastolic > 80 && diastolic <= 90)) {
      return { color: "#FFBE33", status: "លើសឈាម" }; // Elevated
    } else if ((systolic > 130 && systolic <= 140) || (diastolic > 90 && diastolic <= 100)) {
      return { color: "#FF6600", status: "ជំងឺលើសឈាមI" }; // Hypertension Stage I
    } else if (systolic > 140 || diastolic > 100) {
      return { color: "#FF0800", status: "ជំងឺលើសឈាមII" }; // Hypertension Stage II
    }
    return { color: "#CCCCCC", status: "N/A" }; // Not applicable
  }
}
