import { Controller, Get, Route } from "tsoa";
import sendResponse from "../utils/send-response";
// add this for test on ec2 to see if it work or not
@Route("health")
export class HealthController extends Controller {
  @Get("/okay")
  public async getHealth(): Promise<{ message: string }> {
    try {
      return sendResponse({ message: "OK" });
    } catch (error) {
      throw error;
    }
  }
}
