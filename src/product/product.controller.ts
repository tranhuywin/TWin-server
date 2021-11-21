import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags("products")
export class ProductController {
    constructor(private readonly productsService: ProductService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Get('/all')
    getAll(): Promise<Product[]> {
        return this.productsService.getAll();
    }

    @Get('/:idProduct')
    getbyidProduct(@Param('idProduct') idProduct: number): Promise<Product> {
        return this.productsService.findOne(idProduct);
    }

    @Patch('/:idProduct')
    updatebyidProduct(
        @Param('idProduct') idProduct: number,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return this.productsService.updatebyidProduct(idProduct, updateProductDto);
    }

    @Delete('/:idProduct')
    deleteProduct(@Param('idProduct') idProduct: string): Promise<{ status: string }> {
        return this.productsService.detelebyidProduct(idProduct);
    }


    @Get('/brand/:brand')
    getbyBrand(@Param('brand') brand: string): Promise<Product[]> {
        return this.productsService.getbyBrand(brand);
    }

    @Get('/sort')
    async sortProduct(
        @Query('sort') sort: string,
        @Query('brand') brand: string,
        @Query('minPrice') minPrice: number,
        @Query('maxPrice') maxPrice: number,
    ) {
        let products: Product[];
        if (!brand)
            products = await this.productsService.getAll();
        else
            products = await this.productsService.getbyBrand(brand);
        if(minPrice)
            products = this.productsService.getMinPrice(minPrice, products);
        if(maxPrice)
            products = this.productsService.getMaxPrice(maxPrice, products);
        return this.productsService.sortPrice(sort, products);
    }

}
