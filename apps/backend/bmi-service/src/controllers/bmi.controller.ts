import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Route,
  Response,
  SuccessResponse,
} from "tsoa";
import { BMIModel } from "../database/models/bmi.model";
import { BMIDto } from "../interface/bmi.interface";

@Route("bmi-tips")
export class BMIController extends Controller {
  getBMITips() {
      throw new Error('Method not implemented.');
  }
  @Post()
  @SuccessResponse("201", "Created")
  @Response(400, "Bad Request")
  @Response(500, "Internal Server Error")
  public async createBMITip(@Body() body: BMIDto): Promise<BMIDto> {
    try {
      if (
        !body.categorizedTips ||
        !body.description ||
        !body.guideline ||
        !body.should_do ||
        !body.should_not
      ) {
        this.setStatus(400);
        throw new Error(
          "Missing required fields: 'categorizedTips', 'description', 'guideline', 'should_do', or 'should_not'."
        );
      }

      const newTip = new BMIModel(body);
      await newTip.save();

      this.setStatus(201);
      return newTip.toObject() as BMIDto;
    } catch (error) {
      console.error("Error creating BMI Tip:", error);
      this.setStatus(500);
      throw new Error(`Internal Server Error: ${(error as any).message}`);
    }
  }

  @Get()
  @Response(404, "BMI Tip not found")
  @Response(500, "Internal Server Error")
  public async getBMITipByCategory(
    @Query() category: string 
  ): Promise<BMIDto | null> {
    try {
      const decodedCategory = decodeURIComponent(category);
      const tip = await BMIModel.findOne({
        categorizedTips: decodedCategory,
      }).lean();
      if (!tip) {
        this.setStatus(404);
        return null;
      }
      return tip as BMIDto;
    } catch (error) {
      console.error("Error fetching BMI Tip:", error);
      this.setStatus(500);
      throw new Error(`Internal Server Error: ${(error as any).message}`);
    }
  }
}


