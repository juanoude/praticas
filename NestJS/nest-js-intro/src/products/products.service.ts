import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: string): Product {
    const product = this.products.find(product => product.id === id);

    if(!product) {
      throw new NotFoundException('Product not found');

    }
    return product;
  }

  insertProduct({name, description, price}: Partial<Product>): string {
    const newProduct = new Product(
      Math.random().toString(),
      name,
      description,
      price
    );

    this.products.push(newProduct);

    return newProduct.id;
  }

  updateProduct({
    product_id, name, price, description
  }): Product {
    
    const [product, index] = this.findProduct(product_id);

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;

    this.products[index] = product;
    
    return product;
  }

  private findProduct(id: string): [Product, number] {
    const index = this.products.findIndex(product => product.id === id);

    const product = this.products[index];
    
    return [product, index];
  }

  deleteProduct(product_id: string): void {
    const [_, index] = this.findProduct(product_id);

    this.products.splice(index, 1);
  }
}