import * as mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
