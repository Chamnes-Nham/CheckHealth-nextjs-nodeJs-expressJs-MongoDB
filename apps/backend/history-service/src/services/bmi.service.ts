import { IBMI } from "../databases/models/bmi.model";
import { BMIRepository } from "../databases/repositories/bmi.repository";


export class BMIService {
  private bmiRepository: BMIRepository;

  constructor() {
    this.bmiRepository = new BMIRepository();
  }

  calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
  }

  determineCategory(bmi: number, age: number, gender: string): string {
    if (age < 18) {
      if (bmi < 5) return "ស្គមខ្លាំងណាស់";
      if (bmi >= 5 && bmi < 10) return "ស្គមខ្លាំង";
      if (bmi >= 10 && bmi < 18.5) return "ស្គម";
      if (bmi >= 18.5 && bmi < 25) return "សុខភាពល្អ";
      if (bmi >= 25 && bmi < 30) return "លើសទម្ងន់";
      if (bmi >= 30 && bmi < 35) return "លើសទម្ងន់ខ្លាំង";
      if (bmi >= 35 && bmi < 40) return "លើសទម្ងន់ខ្លាំងណាស់";
      return "ធាត់ខ្លាំងណាស់";
    } else {
      if (gender === "male") {
        if (bmi < 15) return "ស្គមខ្លាំងណាស់";
        if (bmi >= 15 && bmi < 16) return "ស្គមខ្លាំង";
        if (bmi >= 16 && bmi < 18.5) return "ស្គម";
        if (bmi >= 18.5 && bmi < 25) return "សុខភាពល្អ";
        if (bmi >= 25 && bmi < 30) return "លើសទម្ងន់";
        if (bmi >= 30 && bmi < 35) return "លើសទម្ងន់ខ្លាំង";
        if (bmi >= 35 && bmi < 40) return "លើសទម្ងន់ខ្លាំងណាស់";
        return "ធាត់ខ្លាំងណាស់";
      } else {
        if (bmi < 14.5) return "ស្គមខ្លាំងណាស់";
        if (bmi >= 14.5 && bmi < 15.5) return "ស្គមខ្លាំង";
        if (bmi >= 15.5 && bmi < 18) return "ស្គម";
        if (bmi >= 18 && bmi < 24.5) return "សុខភាពល្អ";
        if (bmi >= 24.5 && bmi < 29.5) return "លើសទម្ងន់";
        if (bmi >= 29.5 && bmi < 34.5) return "លើសទម្ងន់ខ្លាំង";
        if (bmi >= 34.5 && bmi < 39.5) return "លើសទម្ងន់ខ្លាំងណាស់";
        return "ធាត់ខ្លាំងណាស់";
      }
    }
  }

  async getLatestBmi(username: string): Promise<IBMI | null> {
    try {
      return await this.bmiRepository.findLatest(username);
    } catch (error) {
      console.error('Error getting latest BMI:', error);
      throw error;
    }
  }

  
  async createBMI(data: Partial<IBMI>, username: string): Promise<IBMI> {
    try {
      if (!data.weight || !data.height || !data.age || !data.gender) {
        throw new Error('Missing required fields: weight, height, age, and gender');
      }

      const bmiValue = this.calculateBMI(data.weight, data.height);
      const category = this.determineCategory(bmiValue, data.age, data.gender);
      data.bmi = bmiValue;
      data.category = category;
      data.username = username;

      console.log('Creating BMI with data:', data);

      return await this.bmiRepository.createBMI(data);
    } catch (error) {
      console.error('Error creating BMI:', error);
      throw error;
    }
  }

  
  async getAllBMI(username: string): Promise<IBMI[]> {
    try {
      return await this.bmiRepository.getAllBMI(username);
    } catch (error) {
      console.error('Error getting all BMIs:', error);
      throw error;
    }
  }

  
  async getBMIById(id: string, username: string): Promise<IBMI | null> {
    try {
      return await this.bmiRepository.getBMIById(id, username);
    } catch (error) {
      console.error('Error getting BMI by ID:', error);
      throw error;
    }
  }
  
  async deleteBMI(id: string, username: string): Promise<void> {
    try {
      await this.bmiRepository.deleteBMI(id, username);
    } catch (error) {
      console.error('Error deleting BMI:', error);
      throw error;
    }
  }
}
