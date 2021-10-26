import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, Min, ValidateNested } from "class-validator";
import { CreateColorDto } from "src/color/dto/create-color.dto";

export class CreateMemoryDto {
    @IsNumber()
    @Min(0)
    @ApiProperty()
    Ram: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    Rom: number;

    @ValidateNested()
    @IsArray()
    @ApiProperty({type: CreateColorDto})
    colors: [CreateColorDto];
}
