import { Controller, Get, Post, Route, Body, Delete, Path, Tags, Request } from 'tsoa';
import { BloodPressureService } from '../services/bloodpressure.service';
import { BloodPressure } from '../databases/models/bloodpressure.model';

@Route('v1/bloodPressure')
@Tags("blood-pressure service")
export class BloodPressureController extends Controller {
  private bloodPressureService = new BloodPressureService();

  @Post('/')
  public async createBloodPressure(@Body() body: { systolic: number; diastolic: number }, @Request() req: any): Promise<BloodPressure> {
    try {
      const { systolic, diastolic } = body;
      const username = req.cookies.username; 
      return await this.bloodPressureService.createBloodPressure(systolic, diastolic, username);
    } catch (error) {
      this.setStatus(500);
      throw {
        message: 'Failed to create blood pressure record. Please try again later.',
        details: error instanceof Error ? error.message : error,
      };
    }
  }

  @Get('/latest')
  public async getLatestBloodPressure(@Request() req: any): Promise<BloodPressure | null> {
    try {
      const username = req.cookies.username; 
      return await this.bloodPressureService.getLatestBloodPressure(username);
    } catch (error) {
      this.setStatus(500);
      throw {
        message: 'Failed to fetch the latest blood pressure record. Please try again later.',
        details: error instanceof Error ? error.message : error,
      };
    }
  }

  @Get('/')
  public async getBloodPressureHistory(@Request() req: any): Promise<BloodPressure[]> {
    try {
      const username = req.cookies.username; 
      return await this.bloodPressureService.getBloodPressureHistory(username);
    } catch (error) {
      this.setStatus(500); 
      throw {
        message: 'Failed to fetch blood pressure history. Please try again later.',
        details: error instanceof Error ? error.message : error,
      };
    }
  }

  @Delete('{id}')
  public async deleteBloodPressure(@Path() id: string, @Request() req: any): Promise<BloodPressure | null> {
    try {
      const username = req.cookies.username; 
      return await this.bloodPressureService.deleteBloodPressure(id, username);
    } catch (error) {
      this.setStatus(500); 
      throw {
        message: `Failed to delete blood pressure record with ID ${id}. Please try again later.`,
        details: error instanceof Error ? error.message : error,
      };
    }
  }
}
