import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entitys/phones.entity';
import { Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Specifications } from './entitys/specification.entity';
import { Color } from './entitys/color.entity';

@Injectable()
export class PhonesService {
    constructor(
        @InjectRepository(Phone)
        private readonly phonesRepository: Repository<Phone>,
        @InjectRepository(Specifications)
        private readonly SpecificationsRepository: Repository<Specifications>,
        @InjectRepository(Color)
        private readonly colorsRepository: Repository<Color>,
    ) { }

    async create(createPhoneDto: CreatePhoneDto): Promise<Phone> {

        const phone = new Phone();
        phone.brand = createPhoneDto.brand;
        phone.name = createPhoneDto.name;
        phone.description = createPhoneDto.description;
        phone.image = createPhoneDto.image;
        phone.name = createPhoneDto.name;
        phone.quantity = createPhoneDto.quantity;
        phone.RAM = createPhoneDto.RAM;
        phone.ROM = createPhoneDto.ROM;
        phone.price = createPhoneDto.price;

        const specificationsOfPhone = new Specifications();
        specificationsOfPhone.CPU = createPhoneDto.specifications.CPU;
        specificationsOfPhone.battery = createPhoneDto.specifications.battery;
        specificationsOfPhone.OS = createPhoneDto.specifications.OS;
        specificationsOfPhone.rear_camera = createPhoneDto.specifications.rear_camera;
        specificationsOfPhone.screen_info = createPhoneDto.specifications.screen_info;
        phone.specifications = specificationsOfPhone;

        createPhoneDto.colors.map(async(color) => {
            const colors = new Color();
            colors.color = color.color;
            colors.extra_price = color.extra_price;

            if (!phone.color)
                phone.color = [];
            phone.color.push(colors);
            await this.colorsRepository.save(colors);
        })

        await this.SpecificationsRepository.save(specificationsOfPhone);
        return await this.phonesRepository.save(phone);
    }

    async getAll():Promise<Phone[]>{
        return await this.phonesRepository.find();
    }

    async getbyid(id:string):Promise<Phone>{
        const phone = await this.phonesRepository.find({
            where: {id:id},
            take: 1
        });
        if(!phone.length)
            throw new NotFoundException();
        
        return phone[0];
    }

    async getbyBrand(brand:string): Promise<Phone[]> {
        const phone = await this.phonesRepository.find({
            where: {brand:brand},
        });
        if(!phone.length)
            throw new NotFoundException();
        
            console.log(phone[0]);
        return phone;
    }
}
