

import mongoose, { Schema, Document } from 'mongoose';

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
  dropdownItem: [DropdownItemSchema], // Array of dropdown items
});

export interface IDetail {
  detailTitle: IDetailItem[];
  content: string;
}

const DetailSchema: Schema = new Schema({
  detailTitle: [DetailItemSchema], // Array of detail items
  content: { type: String, required: true },
});

export interface IHealthTip extends Document {
  img: string;
  title: string;
  subtitle: string;
  description?: string;
  category: string;
  details: IDetail[];
}

const HealthTipSchema: Schema = new Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  details: [DetailSchema], 
});

export const HealthTipModel = mongoose.model<IHealthTip>('HealthTip', HealthTipSchema);
