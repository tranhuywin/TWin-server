import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Specifications } from './entities/specification.entity';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Memory } from './entities/memory.entity';
import { Color } from 'src/color/entities/color.entity';

@Injectable()
export class PhonesService {
    constructor(
        @InjectRepository(Phone)
        private readonly phonesRepository: Repository<Phone>,
        @InjectRepository(Specifications)
        private readonly SpecificationsRepository: Repository<Specifications>,
        @InjectRepository(Color)
        private readonly colorsRepository: Repository<Color>,
        @InjectRepository(Memory)
        private readonly memoriesRepository: Repository<Memory>,
    ) { }

    async create(createPhoneDto: CreatePhoneDto): Promise<Phone> {

        const phone = new Phone();
        phone.brand = createPhoneDto.brand;
        phone.name = createPhoneDto.name;
        phone.description = createPhoneDto.description;
        phone.image = createPhoneDto.image;
        phone.name = createPhoneDto.name;
        phone.quantity = createPhoneDto.quantity;

        //get all price of memory
        const prices: number[] = createPhoneDto.memory.flatMap(memory => {
            const priceofcolor = memory.color.map(color => {
                return color.price;
            });
            return priceofcolor;
        });
        // min price of memory for phone
        phone.price = Math.min(...prices);

        const specificationsOfPhone = new Specifications();
        specificationsOfPhone.CPU = createPhoneDto.specifications.CPU;
        specificationsOfPhone.battery = createPhoneDto.specifications.battery;
        specificationsOfPhone.OS = createPhoneDto.specifications.OS;
        specificationsOfPhone.rear_camera = createPhoneDto.specifications.rear_camera;
        specificationsOfPhone.screen_info = createPhoneDto.specifications.screen_info;
        phone.specifications = specificationsOfPhone;

        let colors = [];
        //memory
        const memories = await createPhoneDto.memory.map((memoryofPhone) => {
            const memory = new Memory();
            memory.Ram = memoryofPhone.Ram;
            memory.Rom = memoryofPhone.Rom;
            memory.phone = phone;
            //color
            memoryofPhone.color.map(async colorofPhone => {
                const color = new Color();
                color.HexRGB = colorofPhone.HexRGB;
                color.price = colorofPhone.price;
                color.marketPrice = colorofPhone.marketPrice;
                color.image = colorofPhone.image;
                color.memory = memory;
                colors.push(color);
            });
            return memory;
        })

        await this.SpecificationsRepository.save(specificationsOfPhone);
        const dataPhoneCreate = await this.phonesRepository.save(phone);
        await this.memoriesRepository.save(memories);
        await this.colorsRepository.save(colors);
        return dataPhoneCreate;
    }

    async getAll(): Promise<Phone[]> {
        const phone = await this.phonesRepository
            .createQueryBuilder('phone')
            .leftJoinAndSelect("phone.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'color')
            .leftJoinAndSelect("phone.specifications", 'specification')
            .getMany();

        if (!phone)
            throw new NotFoundException();

        return phone;
    }

    async getbyid(id: string): Promise<Phone> {
        const phone = await this.phonesRepository
            .createQueryBuilder('phone')
            .leftJoinAndSelect("phone.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'color')
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
            .leftJoinAndSelect("phone.memories", 'memory')
            .leftJoinAndSelect("memory.colors", 'color')
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

        if (!updateData.affected) {
            throw new BadRequestException;
        }
        return this.getbyid(id);
    }

    async detelebyidPhone(id: string): Promise<{ status: string }> {
        const deleteData = await this.phonesRepository.delete(id);

        if (!deleteData.affected) {
            throw new BadRequestException;
        }
        return { status: 'success' };
    }

    sortPrice(sort: string, phones: Phone[]) {
        if (sort === 'asc')  //increase
        {
            phones.sort((a, b) => a.price - b.price)
        }
        else if (sort === 'desc') //decrease
        {
            phones.sort((a, b) => b.price - a.price)
        }
        else
            throw new BadRequestException();
        return phones;
    }

    getMinPrice(minPrice: number, phones: Phone[]): Phone[] {
        return phones.filter(phone => {
            if (phone.price >= minPrice)
                return phone;
        })
    }
    getMaxPrice(maxPrice: number, phones: Phone[]): Phone[] {
        return phones.filter(phone => {
            if (phone.price <= maxPrice)
                return phone;
        })
    }
}
