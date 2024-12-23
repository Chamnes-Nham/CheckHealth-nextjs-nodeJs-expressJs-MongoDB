import { Schema, model} from 'mongoose';

export interface BloodPressure {
  systolic: number;
  diastolic: number;
  color: string;
  status: string;
  username: string;
  note: string;
  time: string;
  date: string;
}

const BloodPressureSchema = new Schema<BloodPressure>({
  systolic: { type: Number, required: true },
  diastolic: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: String, required: true },
  username: {type: String, required: true},
  time: {type: String, required: true},
  date: {type: String, required: true}
},);

export const BloodPressureModel = model<BloodPressure>('BloodPressure', BloodPressureSchema);

