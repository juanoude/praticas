import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
  ) {  }
}