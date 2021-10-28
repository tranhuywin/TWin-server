import { ApiProperty } from "@nestjs/swagger";
import { Contains, IsNotEmpty, IsNumber, IsString, IsUrl, Min } from "class-validator";

export class UpdateProductDto {
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
    @IsUrl()
    @Contains(`http://res.cloudinary.com/`)
    thumbnail: string;
    
    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    price: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    marketPrice: number;
}