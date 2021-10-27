import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class SortProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsString()
    description: string;

    image: string;

    @IsNumber()
    @Min(0)
    RAM: number;

    @IsNumber()
    @Min(0)
    ROM: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;
}