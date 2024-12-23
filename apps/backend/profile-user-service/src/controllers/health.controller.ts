import sendResponse from "@/src/utils/send-response";
import { Controller, Get, Route } from "tsoa";

// for check if deploy is successful or not in ec2

@Route("users")
export class HealthController extends Controller {
  @Get("/health/okay")
  public async getHealth(): Promise<{ message: string }> {
    try {
      return sendResponse({ message: "OK" });
    } catch (error) {
      throw error;
    }
  }
}
