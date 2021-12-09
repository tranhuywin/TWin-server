import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { ColorService } from 'src/color/color.service';
import { Memory } from './entities/memory.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private readonly memoriesRepository: Repository<Memory>,
    // @InjectRepository(Product)
    // private readonly productsRepository: Repository<Product>,
    @Inject(forwardRef(() => ProductService))
        private readonly productsService: ProductService,
    @Inject(forwardRef(() => ColorService))
    private readonly colorService: ColorService,
  ) { }

  async create(idProduct: number, createMemoryDto: CreateMemoryDto): Promise<Memory> {
    const product = await this.productsService.findOne(idProduct);

    const memory = new Memory();
    memory.Ram = createMemoryDto.Ram;
    memory.Rom = createMemoryDto.Rom;
    memory.product = product;
    const dataMemory = await this.memoriesRepository.save(memory)

    createMemoryDto.colors.map(async (color) => {
      await this.colorService.create(memory.id, color);
    })

    return dataMemory;
  }

  async findAll(): Promise<Memory[]> {
    return await this.memoriesRepository.find();
  }

  async findByProduct(idProduct: number): Promise<Memory[]> {
    const product = await this.productsService.findOne(idProduct);
    return await this.memoriesRepository.find({ product: product });
  }

  async findOne(id: number): Promise<Memory> {
    const memory = await this.memoriesRepository
      .createQueryBuilder('memory')
      .leftJoinAndSelect('memory.colors', 'colors')
      .where('memory.id = :id', { id: id })
      .getOne();

    if (!memory)
      throw new NotFoundException();
    return memory;
  }

  async update(id: number, updateMemoryDto: UpdateMemoryDto): Promise<Memory> {
    const updateData = await this.memoriesRepository
      .createQueryBuilder()
      .update(Memory)
      .set(updateMemoryDto)
      .where('id = :id', { id: id })
      .execute();

    if (!(updateData).affected) {
      throw new BadRequestException;
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ status: 'success' }> {
    const deleteData = await this.memoriesRepository.delete(id);

    if (!deleteData.affected) {
      throw new BadRequestException;
    }
    return { status: 'success' };
  }
}
