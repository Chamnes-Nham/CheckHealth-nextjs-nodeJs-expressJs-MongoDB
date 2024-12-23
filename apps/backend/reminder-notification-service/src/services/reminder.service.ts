import { IReminder } from "@/src/database/models/reminder.model";
import { ReminderRepository } from "@/src/database/repositories/reminder.repository";

export class ReminderService {
  private repository: ReminderRepository = new ReminderRepository();

  // create reminder
  public async createReminder(data: IReminder): Promise<IReminder> {
    return this.repository.create(data);
  }

  // get all reminders
  public async getAllReminders(): Promise<IReminder[]> {
    return this.repository.findAll();
  }

  // get a reminder by ID
  public async getReminderById(id: string): Promise<IReminder | null> {
    try{
      return this.repository.findById(id);
    }catch(error){
      throw error
    }
  }

  // update a reminder by ID
  public async updateReminder(
    id: string,
    data: Partial<IReminder>
  ): Promise<IReminder | null> {
    return this.repository.updateById(id, data);
  }

  // delete a reminder by ID
  public async deleteReminder(id: string): Promise<IReminder | null> {
    return this.repository.deleteById(id);
  }
}
