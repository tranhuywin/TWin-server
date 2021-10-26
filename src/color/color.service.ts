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
     const memory = await this.memoryService.findOne(idMemory);

    const color = new Color();
    color.HexRGB = createColorDto.HexRGB;
    color.image = createColorDto.image;
    color.marketPrice = createColorDto.marketPrice;
    color.price = createColorDto.price;
    color.memory = memory;

    return await this.colorsRepository.save(color); 
  }

  async findOne(id: number):Promise<Color>  {
    const color = await this.colorsRepository.findOne(id);
    if(!color)
      throw new NotFoundException();
    return color;
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