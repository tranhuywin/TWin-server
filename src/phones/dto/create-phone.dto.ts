import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsHexColor, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";


class Specification {
    @IsString()
    @ApiProperty()
    screen_info: string;
    
    @IsString()
    @ApiProperty()
    CPU: string;

    @IsString()
    @ApiProperty()
    rear_camera: string;

    @IsString()
    @ApiProperty()
    battery: string;

    @IsString()
    @ApiProperty()
    OS: string;
}

class Color {
    @IsHexColor()
    @ApiProperty()
    HexRGB: string;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    price: number;
}

class Memory {
    @IsNumber()
    @Min(0)
    @ApiProperty()
    Ram: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    Rom: number;

    @ValidateNested()
    @ApiProperty({type: Color})
    color: [Color];
}

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

    @ApiProperty()
    image: string;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    quantity: number;

    @ApiProperty({type: Specification})
    @ValidateNested()
    specifications: Specification;

    @IsArray()
    @ApiProperty({type: Memory})
    @ValidateNested()
    memory: [Memory]
}
