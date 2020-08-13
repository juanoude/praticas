import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async AllProducts(): Promise<IProduct[]> {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async GetProduct(
    @Param('id')
    product_id: string,
  ): Promise<IProduct> {
    return await this.productsService.getProduct(product_id);
  }

  @Post()
  async AddProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<any> {
    const generatedId = await this.productsService.insertProduct({
      name,
      description,
      price,
    });
    return { id: generatedId };
  }

  @Patch(':id')
  async UpdateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<IProduct> {
    const updatedProduct = await this.productsService.updateProduct({
      id,
      name,
      description,
      price,
    });

    return updatedProduct;
  }

  @Delete(':id')
  async DeleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
    return null;
  }
}
