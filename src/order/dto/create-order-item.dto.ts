import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min } from "class-validator";

export class CreateOrderItemDto {
    @ApiProperty()
    @IsNotEmpty()
    colorId: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(0)
    quantity: number;
}