import { Body, Controller, Delete, Get, Path, Post, Request, Route, Tags } from 'tsoa';
import { BMIService } from '../services/bmi.service';
import { IBMI } from '../databases/models/bmi.model';

@Route('v1/bmi')
@Tags('BMI-service')
export class BMIController extends Controller {
  private bmiService: BMIService;

  constructor() {
    super();
    this.bmiService = new BMIService();
  }

  @Get('/latest')
  public async getLatestBMI(@Request() req: any): Promise<IBMI | null> {
    try {
      const username = req.cookies.username;
      return await this.bmiService.getLatestBmi(username);
    } catch (error) {
      console.error(`Error fetching latest BMI for user: ${req.cookies.username}`, error);
      throw new Error('Failed to fetch latest BMI. Please try again later.');
    }
  }

  @Post('/')
  public async createBMI(@Body() requestBody: Partial<IBMI>, @Request() req: any): Promise<IBMI> {
    try {
      const username = req.cookies.username;
      return await this.bmiService.createBMI(requestBody, username);
    } catch (error) {
      console.error(`Error creating BMI for user: ${req.cookies.username}`, error);
      throw new Error('Failed to create BMI record. Please try again later.');
    }
  }

  @Get('/')
  public async getAllBMI(@Request() req: any): Promise<IBMI[]> {
    try {
      const username = req.cookies.username;
      return await this.bmiService.getAllBMI(username);
    } catch (error) {
      console.error(`Error fetching all BMI records for user: ${req.cookies.username}`, error);
      throw new Error('Failed to fetch all BMI records. Please try again later.');
    }
  }

  @Get('/{id}')
  public async getBMIById(@Path() id: string, @Request() req: any): Promise<IBMI | null> {
    try {
      const username = req.cookies.username;
      return await this.bmiService.getBMIById(id, username);
    } catch (error) {
      console.error(`Error fetching BMI record with id: ${id} for user: ${req.cookies.username}`, error);
      throw new Error('Failed to fetch BMI record. Please try again later.');
    }
  }

  @Delete('/{id}')
  public async deleteBMI(@Path() id: string, @Request() req: any): Promise<void> {
    try {
      const username = req.cookies.username;
      await this.bmiService.deleteBMI(id, username);
    } catch (error) {
      console.error(`Error deleting BMI record with id: ${id} for user: ${req.cookies.username}`, error);
      throw new Error('Failed to delete BMI record. Please try again later.');
    }
  }
}
