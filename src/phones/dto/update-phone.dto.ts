import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class UpdatePhoneDto {
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

    @ApiProperty()
    image: string;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    RAM: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    ROM: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    price: number;
}