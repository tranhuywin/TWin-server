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
        product.image = createProductDto.image;
        product.name = createProductDto.name;
        product.quantity = createProductDto.quantity;

        //get all price of memory
        let prices: number[] = [0];
        if (createProductDto.capacityPhone) {
            prices = createProductDto.capacityPhone.flatMap(memory => {
                const priceofcolor = memory.colors.map(color => {
                    return color.price;
                });
                return priceofcolor;
            });
        }

        // min price of phone
        product.price = Math.min(...prices);

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
        if (createProductDto.capacityPhone) {
            memories = await createProductDto.capacityPhone.map((memoryofProduct) => {
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


        
        const dataProductCreate = await this.productsRepository.save(product);
        await this.SpecificationsRepository.save(specifications);
        if (createProductDto.capacityPhone)
        await this.memoriesRepository.save(memories);
        if (createProductDto.capacityPhone)
        await this.colorsRepository.save(colors);
        return dataProductCreate;
    }

    async getAll(): Promise<Product[]> {
        const product = await this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect("product.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'color')
            .leftJoinAndSelect("product.specifications", 'specification')
            .getMany();

        if (!product)
            throw new NotFoundException();

        return product;
    }

    async getbyid(id: number): Promise<Product> {
        const product = await this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect("product.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'color')
            .leftJoinAndSelect("product.specifications", 'specification')
            .where("product.id = :id", { id: id })
            .getOne();

        if (!product)
            throw new NotFoundException();

        return product;
    }

    async getbyBrand(brand: string): Promise<Product[]> {
        const product = await this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect("product.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'color')
            .leftJoinAndSelect("product.specifications", 'specification')
            .where("product.brand = :brand", { brand: brand })
            .getMany();

        if (!product)
            throw new NotFoundException();

        return product;
    }

    async updatebyidProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const updateData = await this.productsRepository
            .createQueryBuilder()
            .update(Product)
            .set(updateProductDto)
            .where('id = :id', { id: id })
            .execute()

        if (!updateData.affected) {
            throw new BadRequestException;
        }
        return this.getbyid(id);
    }

    async detelebyidProduct(id: string): Promise<{ status: string }> {
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
