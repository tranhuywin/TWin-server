import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryService } from 'src/memory/memory.service';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorsRepository: Repository<Color>,
    @Inject(forwardRef(() => MemoryService))
    private readonly memoryService: MemoryService,
    ) {}

  async create(idMemory:number, createColorDto: CreateColorDto):Promise<Color> {
     await this.memoryService.findOne(idMemory);
    const color = await this.colorsRepository.create(createColorDto);
    return await this.colorsRepository.save(color);
  }

  async findOne(id: number):Promise<Color>  {
    const color = await this.colorsRepository.findOne(id);
    if(!color)
      throw new NotFoundException("Color not found");
    return color;
  }

  async findAll():Promise<Color[]> {
    return await this.colorsRepository.find();
  }
  async findByMemory(idMemory: number):Promise<Color[]> {
    const colors = await this.colorsRepository.find({
      where: {
        memory: idMemory,
      },
    });
    if (!colors) {
      throw new NotFoundException("No colors found");
    }
    return colors;
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    const updateData = await this.colorsRepository
            .createQueryBuilder()
            .update(Color)
            .set(updateColorDto)
            .where('id = :id', { id: id })
            .execute()

        if (!updateData.affected) {
            throw new BadRequestException;
        }
        return this.findOne(id);
  }

  async remove(id: number):Promise<{status: string}> {
    const dataDelete = await this.colorsRepository.delete(id);
    
    if (!dataDelete.affected) {
      throw new BadRequestException;
  }
  return { status: 'success' };
  }
}
