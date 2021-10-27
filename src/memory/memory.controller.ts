import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('memories')
@ApiTags("memories")
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post('/idProduct/:idProduct')
  create(@Body() createMemoryDto: CreateMemoryDto, @Param('idProduct') idProduct: number) {
    return this.memoryService.create(idProduct, createMemoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoryService.update(+id, updateMemoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoryService.remove(+id);
  }
}
