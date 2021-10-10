import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Phone } from './entitys/phones.entity';

@Controller('phones')
export class PhonesController {
    constructor(private readonly phonesService: PhonesService){}

    @Post()
    create(@Body() createPhoneDto: CreatePhoneDto): Promise<Phone>{
        return this.phonesService.create(createPhoneDto);
    }

    @Get('/all')
    getAll(): Promise<Phone[]>{
        return this.phonesService.getAll();
    }
    
    @Get('/id/:idPhone')
    getbyidPhone(@Param('idPhone') idPhone: string): Promise<Phone>{
        return this.phonesService.getbyid(idPhone);
    }

    @Get('/brand/:brand')
    getbyBranch(@Param('brand') brand: string): Promise<Phone[]>{
        return this.phonesService.getbyBrand(brand);
    }
}
