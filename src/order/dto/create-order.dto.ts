import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, Max, Min, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {

    //0 = waiting comformation, 1 = waiting delivery, 2 = delivered, 3 = canceled
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(3)
    @ApiProperty({description: "0 = waiting comformation, 1 = waiting delivery, 2 = delivered, 3 = canceled"})
    status: number;

    @IsNotEmpty()
    @ApiProperty()
    @IsPhoneNumber('VN')
    phoneNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    city: string;

    @IsNotEmpty()
    @ApiProperty()
    district: string;

    @IsNotEmpty()
    @ApiProperty()
    street: string;

    @ApiProperty()
    otherRequests: string;

    @ValidateNested()
    @ApiProperty({type: CreateOrderItemDto})
    @IsNotEmpty()
    orderItems: CreateOrderItemDto[];

    @ApiProperty()
    @IsNotEmpty()
    userId: number;
}
