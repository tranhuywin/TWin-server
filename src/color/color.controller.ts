import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('colors')
@ApiTags("colors")
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post('/idMemory/:idMemory')
  create(@Body() createColorDto: CreateColorDto, @Param('idMemory') idMemory: number) {
    return this.colorService.create(idMemory, createColorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.colorService.remove(id);
  }
}
