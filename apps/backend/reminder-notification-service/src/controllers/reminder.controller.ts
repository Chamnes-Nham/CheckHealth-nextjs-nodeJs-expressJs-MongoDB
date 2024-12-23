import {
  Controller,
  Route,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Tags,
  Path,
} from "tsoa";
import { ReminderService } from "../services/reminder.service";
import { IReminder } from "@/src/database/models/reminder.model";

export interface ReminderCreationParams {
  title: string;
  time?: string; // Optional time, will default to current time if not provided
  date?: string; // Optional date, will default to current date if not provided
  days: string[]; // Array of days (e.g., ['Mon', 'Tue', 'Wed', 'Fri', 'Sun'])
}

@Tags("Reminders")
@Route("/reminders")
export class ReminderController extends Controller {
  private reminderService: ReminderService = new ReminderService();

  @Post("/")
  public async createReminder(
    @Body() requestBody: ReminderCreationParams
  ): Promise<IReminder> {
    const currentDate = new Date();

    // Set defaults for time and date if not provided
    const reminderData: IReminder = {
      ...requestBody,
      date: requestBody.date ? new Date(requestBody.date) : currentDate,
      time: requestBody.time || currentDate.toLocaleTimeString(),
      createdAt: currentDate,
      updatedAt: currentDate,
      id: "",
    };

    return this.reminderService.createReminder(reminderData);
  }

  @Get("/")
  public async getReminders(): Promise<IReminder[]> {
    return this.reminderService.getAllReminders();
  }

  @Get("/{id}")
  public async getReminderById(@Path() id: string): Promise<IReminder | null> {
    try {
      return this.reminderService.getReminderById(id);
    } catch (error) {
      throw error;
    }
  }

  @Put("/{id}")
  public async updateReminder(
    @Path() id: string,
    @Body() requestBody: Partial<ReminderCreationParams>
  ): Promise<IReminder | null> {
    const updatedData: Partial<IReminder> = {
      ...requestBody,
      date: requestBody.date ? new Date(requestBody.date) : undefined,
      updatedAt: new Date(),
      time: requestBody.time,
      days: requestBody.days,
    };

    return this.reminderService.updateReminder(id, updatedData);
  }

  @Delete("/{id}")
  public async deleteReminder(@Path() id: string): Promise<IReminder | null> {
    return this.reminderService.deleteReminder(id);
  }
}
