import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUrl, Min } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    brand?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description?: string;

    @IsOptional()
    @ApiProperty()
    @IsUrl()
    thumbnail?: string;
    
    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty()
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty()
    marketPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty()
    originalPrice?: number;
}