import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { ProductService } from 'src/product/product.service';
import { ColorService } from 'src/color/color.service';
import { Memory } from './entities/memory.entity';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private readonly memoriesRepository: Repository<Memory>,
    private readonly productService: ProductService,
    @Inject(forwardRef(() => ColorService))
    private readonly colorService: ColorService,
  ) { }

  async create(idProduct: number, createMemoryDto: CreateMemoryDto): Promise<Memory> {
    const product = await this.productService.findOne(idProduct);

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

    //TODO: remove colors
    if (!deleteData.affected) {
      throw new BadRequestException;
    }
    return { status: 'success' };
  }
}
