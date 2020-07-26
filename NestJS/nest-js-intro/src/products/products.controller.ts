import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @Get()
  AllProducts(): IProduct[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  GetProduct(
    @Param('id')
    product_id: string
  ): IProduct {
    return this.productsService.getProduct(product_id);
  }

  @Post()
  AddProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number
  ): any {
    const generatedId = this.productsService.insertProduct({name, description, price});
    return { id: generatedId };
  }

  @Patch(':id')
  UpdateProduct(
    @Param('id') product_id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    const updatedProduct = this.productsService.updateProduct({product_id, name, description, price});

    return updatedProduct;
  }

  @Delete(':id') 
  DeleteProduct(@Param('id') id: string): {deleted: boolean} {
    this.productsService.deleteProduct(id);
    return { deleted: true};
  }
}