import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class CreateCartItemDto {
    @ApiProperty()
    @IsNumber()
    @Min(0)
    quantity: number;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    cartId: number;
}