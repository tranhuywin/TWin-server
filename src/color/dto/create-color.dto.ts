import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsNumber, IsUrl, Min } from "class-validator";

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

    @IsNumber()
    @Min(0)
    @ApiProperty()
    originalPrice: number;

    @IsNumber()
    @ApiProperty()
    @Min(0)
    quantity: number;

    @ApiProperty()
    @IsUrl()
    image: string;
}