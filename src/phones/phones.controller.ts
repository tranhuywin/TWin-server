import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Phone } from './entitys/phone.entity';
import { UpdatePhoneDto } from './dto/update-phone';

@Controller('phones')
export class PhonesController {
    constructor(private readonly phonesService: PhonesService) { }

    @Post()
    create(@Body() createPhoneDto: CreatePhoneDto): Promise<Phone> {
        return this.phonesService.create(createPhoneDto);
    }

    @Get('/all')
    getAll(): Promise<Phone[]> {
        return this.phonesService.getAll();
    }

    @Get('/id/:idPhone')
    getbyidPhone(@Param('idPhone') idPhone: string): Promise<Phone> {
        return this.phonesService.getbyid(idPhone);
    }

    @Put('/id/:idPhone')
    updatebyidPhone(
        @Param('idPhone') idPhone: string,
        @Body() updatePhoneDto: UpdatePhoneDto
    ): Promise<Phone> {
        return this.phonesService.updatebyidPhone(idPhone, updatePhoneDto);
    }
    
    @Delete('/id/:idPhone')
    deletePhone(@Param('idPhone') idPhone: string): Promise<any> {
        return this.phonesService.detelebyidPhone(idPhone);
    }

    @Get('/brand/:brand')
    getbyBrand(@Param('brand') brand: string): Promise<Phone[]> {
        return this.phonesService.getbyBrand(brand);
    }

}
