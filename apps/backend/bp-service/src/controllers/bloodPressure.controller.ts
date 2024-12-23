import { Body, Controller, Post, Get, Route, Tags, Response } from "tsoa";
import { BloodPressureTipService } from "../services/bloodPressure.service";

interface CreateTipRequest {
  categorizedTips: string;
  description: string;
  guideline: {
    title: string;
    content: string;
  }[];
  should_do: {
    title: string;
    content: string;
  }[];
  should_not: {
    title: string;
    content: string;
  }[];
}

@Route("tips")
@Tags("Blood Pressure Tips")
export class BloodPressureTipController extends Controller {
  private bloodPressureTipService: BloodPressureTipService;

  constructor() {
    super();
    this.bloodPressureTipService = new BloodPressureTipService();
  }

  @Post("/")
  @Response("201", "Tip created successfully")
  @Response("400", "Invalid request data")
  @Response("500", "Internal Server Error")
  public async createTip(
    @Body() body: CreateTipRequest
  ): Promise<{ message: string; tip?: any }> {
    try {
      if (!body.categorizedTips || !body.description) {
        this.setStatus(400);
        return {
          message:
            "Invalid request data: Missing categorizedTips or description",
        };
      }

      const createdTip = await this.bloodPressureTipService.createTip(
        body.categorizedTips,
        body.description,
        body.guideline,
        body.should_do,
        body.should_not
      );

      this.setStatus(201);
      return { message: "Tip created successfully", tip: createdTip };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setStatus(500);
        return { message: `Error creating tip: ${error.message}` };
      }
      return { message: "Unknown error occurred while creating tip" };
    }
  }

  @Get("/")
  @Response("200", "Tips fetched successfully")
  @Response("500", "Failed to fetch tips")
  public async getTips(): Promise<{ message: string; tips?: any[] }> {
    try {
      const tips = await this.bloodPressureTipService.getTips();
      this.setStatus(200);
      return { message: "Tips fetched successfully", tips };
    } catch (error) {
      this.setStatus(500);
      return { message: "Error fetching tips" };
    }
  }
}
