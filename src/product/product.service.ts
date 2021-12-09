import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Specifications } from './entities/specification.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { Color } from 'src/color/entities/color.entity';
import { Memory } from 'src/memory/entities/memory.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Specifications)
        private readonly SpecificationsRepository: Repository<Specifications>,
        @InjectRepository(Color)
        private readonly colorsRepository: Repository<Color>,
        @InjectRepository(Memory)
        private readonly memoriesRepository: Repository<Memory>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {

        const product = new Product();
        product.brand = createProductDto.brand;
        product.name = createProductDto.name;
        product.description = createProductDto.description;
        product.thumbnail = createProductDto.thumbnail;
        product.name = createProductDto.name;
        product.quantity = createProductDto.quantity;

        //get all price of memory
        let prices: number[][] = [];
        if (createProductDto.memoryPhone) {
            prices = createProductDto.memoryPhone.flatMap(memory => {
                const priceofcolor = memory.colors.map(color => {
                    return [color.price, color.marketPrice];
                });
                return priceofcolor;
            });

            // get min price from 2-dimensional arrays of price
            product.price = Math.min(...(prices.map(price => price[0])));
            // get min marketPrice from 2-dimensional arrays of price
            product.marketPrice = Math.min(...(prices.map(price => price[1])));
        }

        const specifications = await createProductDto.specifications.map(specification => {
            const specificationsOfProduct = new Specifications();
            specificationsOfProduct.key = specification.key;
            specificationsOfProduct.value = specification.value;
            specificationsOfProduct.product = product;
            return specificationsOfProduct;
        });

        let colors = [];
        let memories = [];
        //memory
        if (createProductDto.memoryPhone) {
            memories = await createProductDto.memoryPhone.map((memoryofProduct) => {
                const memory = new Memory();
                memory.Ram = memoryofProduct.Ram;
                memory.Rom = memoryofProduct.Rom;
                memory.product = product;
                //color
                memoryofProduct.colors.map(async colorofProduct => {
                    const color = new Color();
                    color.HexRGB = colorofProduct.HexRGB;
                    color.price = colorofProduct.price;
                    color.marketPrice = colorofProduct.marketPrice;
                    color.image = colorofProduct.image;
                    color.memory = memory;
                    colors.push(color);
                });
                return memory;
            })
        }

        if (createProductDto.colorAccessory) {
            createProductDto.colorAccessory.map(async colorofProduct => {
                const color = new Color();
                color.HexRGB = colorofProduct.HexRGB;
                color.price = colorofProduct.price;
                color.marketPrice = colorofProduct.marketPrice;
                color.image = colorofProduct.image;
                color.product = product;
                colors.push(color);

                prices.push([colorofProduct.price, colorofProduct.marketPrice]);
            });

            // get min price from 2-dimensional arrays of price
            product.price = Math.min(...(prices.map(price => price[0])));
            // get min marketPrice from 2-dimensional arrays of price
            product.marketPrice = Math.min(...(prices.map(price => price[1])));
        }



        await this.productsRepository.save(product);
        await this.SpecificationsRepository.save(specifications);
        if (createProductDto.memoryPhone)
            await this.memoriesRepository.save(memories);
        await this.colorsRepository.save(colors);
        const newProduct = await this.findOne(product.id);
        return newProduct;
    }

    async getAll(): Promise<Product[]> {
        const product = await this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect("product.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'colorPhone')
            .leftJoinAndSelect("product.colorAccessory", 'colorAccessory')
            .leftJoinAndSelect("product.specifications", 'specification')
            .getMany();

        if (!product)
            throw new NotFoundException();

        return product;
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect("product.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'colorPhone')
            .leftJoinAndSelect("product.colorAccessory", 'colorAccessory')
            .leftJoinAndSelect("product.specifications", 'specification')
            .where("product.id = :id", { id: id })
            .getOne();

        if (!product)
            throw new NotFoundException('Product not found');

        return product;
    }

    async getbyBrand(brand: string): Promise<Product[]> {
        const product = await this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect("product.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'colorPhone')
            .leftJoinAndSelect("product.colorAccessory", 'colorAccessory')
            .leftJoinAndSelect("product.specifications", 'specification')
            .where("product.brand = :brand", { brand: brand })
            .getMany();

        if (!product)
            throw new NotFoundException();

        return product;
    }

    async updatebyidProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.findOne(id);
        await this.productsRepository.update(id, updateProductDto);
        return this.findOne(id);
    }

    async detelebyidProduct(id: number): Promise<{ status: string }> {
        const deleteData = await this.productsRepository.delete(id);

        if (!deleteData.affected) {
            throw new BadRequestException;
        }
        return { status: 'success' };
    }

    sortPrice(sort: string, products: Product[]) {
        if (sort === 'asc')  //increase
        {
            products.sort((a, b) => a.price - b.price)
        }
        else if (sort === 'desc') //decrease
        {
            products.sort((a, b) => b.price - a.price)
        }
        else
            throw new BadRequestException();
        return products;
    }

    getMinPrice(minPrice: number, products: Product[]): Product[] {
        return products.filter(product => {
            if (product.price >= minPrice)
                return product;
        })
    }
    getMaxPrice(maxPrice: number, products: Product[]): Product[] {
        return products.filter(product => {
            if (product.price <= maxPrice)
                return product;
        })
    }
}
