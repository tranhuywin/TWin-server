import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entitys/phone.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Specifications } from './entitys/specification.entity';
import { Color } from './entitys/color.entity';
import { UpdatePhoneDto } from './dto/update-phone';

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

        createPhoneDto.colors.map(async (color) => {
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

    async getAll(): Promise<Phone[]> {
        return await this.phonesRepository.find();
    }

    async getbyid(id: string): Promise<Phone> {
        const phone = await this.phonesRepository
            .createQueryBuilder('phone')
            .leftJoinAndSelect("phone.color", 'color')
            .leftJoinAndSelect("phone.specifications", 'specification')
            .where("phone.id = :id", { id: id })
            .getOne();

        if (!phone)
            throw new NotFoundException();

        return phone;
    }

    async getbyBrand(brand: string): Promise<Phone[]> {
        const phone = await this.phonesRepository
            .createQueryBuilder('phone')
            .leftJoinAndSelect("phone.color", 'color')
            .leftJoinAndSelect("phone.specifications", 'specification')
            .where("phone.brand = :brand", { brand: brand })
            .getMany();

        if (!phone)
            throw new NotFoundException();

        return phone;
    }

    async updatebyidPhone(id: string, updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
        const updateData = await this.phonesRepository
            .createQueryBuilder()
            .update(Phone)
            .set(updatePhoneDto)
            .where('id = :id', { id: id })
            .execute()

        if(!updateData.affected) {
            throw new BadRequestException;
        }
        return this.getbyid(id);
    }

    async detelebyidPhone(id: string): Promise<DeleteResult>{
        const deleteData = await this.phonesRepository.delete(id);
        
        if(!deleteData.affected) {
            throw new BadRequestException;
        }
        return deleteData;
    }
}
