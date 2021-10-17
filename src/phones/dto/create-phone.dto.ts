import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, Min } from "class-validator";
import { ISpecification } from "../interfaces/specification.interface";

export class CreatePhoneDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    brand: string;

    @IsString()
    @ApiProperty()
    description: string;

    image: string;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity: number;

    @IsObject()
    @ApiProperty()
    specifications: ISpecification;
    
    @IsArray()
    @ApiProperty()
    memory: [{ 
        Ram: number;
        Rom: number;
        color: [{
            HexRGB: string;
            price: number;
        }], 
    }]
}