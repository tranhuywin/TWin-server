import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min, ValidateNested } from "class-validator";
import { CreateColorDto } from "src/color/dto/create-color.dto";
import { CreateMemoryDto } from "src/memory/dto/create-memory.dto";

class Specification {
    @IsString()
    @ApiProperty()
    key: string;

    @IsString()
    @ApiProperty()
    value: string;
}

export class CreateProductDto {
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
    thumbnail: string;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity: number;

    @ApiProperty({type: Specification})
    @ValidateNested()
    specifications: [Specification];

    @IsArray()
    @IsOptional()
    @ApiProperty({type: CreateMemoryDto})
    @ValidateNested()
    memoryPhone: [CreateMemoryDto]

    @IsArray()
    @IsOptional()
    @ApiProperty({type: CreateColorDto})
    @ValidateNested()
    colorAccessory: [CreateColorDto];
}
