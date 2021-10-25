import { ApiProperty } from "@nestjs/swagger";
import { Contains, IsArray, IsNotEmpty, IsNumber, IsString, IsUrl, Min, ValidateNested } from "class-validator";
import { CreateColorDto } from "src/color/dto/create-color.dto";

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
    @ApiProperty({type: CreateColorDto})
    color: [CreateColorDto];
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
    @IsUrl()
    @Contains(`http://res.cloudinary.com/`)
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
