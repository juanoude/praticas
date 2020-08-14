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

  async getProduct(product_id: string): Promise<IProduct> {
    const product = await this.productModel.findById(product_id).exec();

    if (!product) throw new NotFoundException('not found');

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

  async updateProduct(updatedProduct: IProduct): Promise<IProduct> {
    const product = await this.productModel.findById(updatedProduct.id);

    if (!product) throw new NotFoundException('not found');

    // skipping null values on replacement
    const keyAndValues = Object.entries(updatedProduct);
    keyAndValues.forEach(current => {
      if (current[0] === 'id') return;
      if (current[1]) product[current[0]] = current[1]
    });

    await product.save();

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
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
