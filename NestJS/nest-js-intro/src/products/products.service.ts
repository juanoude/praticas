import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProduct } from './products.controller';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  products: Product[] = [];

  async getProducts(): Promise<IProduct[]> {
    const products = await this.productModel.find().exec();

    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    }));
  }

  async getProduct(id: string): Promise<IProduct> {
    const product = await this.findProduct(id);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }

  async insertProduct({
    name,
    description,
    price,
  }: Partial<Product>): Promise<string> {
    const newProduct = new this.productModel({
      name,
      description,
      price,
    });

    const result = await newProduct.save();

    return result.id;
  }

  async updateProduct({ id, name, description, price }): Promise<IProduct> {
    const product = await this.findProduct(id);

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    await product.save();

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();

      if (!product) {
        throw new Error();
      }
    } catch (err) {
      throw new NotFoundException('product not found');
    }

    return;
  }

  async deleteProduct(product_id: string): Promise<void> {
    try {
      const result = await this.productModel
        .deleteOne({ _id: product_id })
        .exec();
      if (result.deletedCount === 0) throw new Error();
    } catch (err) {
      throw new NotFoundException('Could not delete or find the data');
    }
  }
}
