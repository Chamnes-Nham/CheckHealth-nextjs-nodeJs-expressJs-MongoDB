import mongoose, { Schema,  } from 'mongoose';

export interface IDropdownItem {
  text: string;
  href: string;
}

const DropdownItemSchema: Schema = new Schema({
  text: { type: String, required: true },
  href: { type: String, required: true },
});

export interface IDetailItem {
  text: string;
  dropdownItem: IDropdownItem[];
}

const DetailItemSchema: Schema = new Schema({
  text: { type: String, required: true },
  dropdownItem: [DropdownItemSchema], 
});

export interface IDetail {
  detailTitle: IDetailItem[];
  content: string;
}

const DetailSchema: Schema = new Schema({
  detailTitle: [DetailItemSchema], 
  content: { type: String, required: true },
});

export interface IHealthTip {
  title: string;
  subtitle: string;
  description?: string;
  img?: string;
  category: string;
  details?: IDetail;
}

const HealthTipSchema: Schema = new Schema({
  img: { type: String },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  details: { type: DetailSchema, required: false }, 
});

export const HealthTipModel = mongoose.model<IHealthTip>('HealthTip', HealthTipSchema);
