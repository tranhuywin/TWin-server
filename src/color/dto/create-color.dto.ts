import { ApiProperty } from "@nestjs/swagger";
import { Contains, IsHexColor, IsNumber, IsUrl, Min } from "class-validator";

export class CreateColorDto {
    @IsHexColor()
    @ApiProperty()
    HexRGB: string;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    price: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    marketPrice: number;

    @ApiProperty()
    @IsUrl()
    @Contains(`http://res.cloudinary.com/`)
    image: string;
}