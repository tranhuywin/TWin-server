import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, Min } from "class-validator";

export class CreatePhoneDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsString()
    description: string;

    image: string;

    @IsNumber()
    @Min(0)
    RAM: number;

    @IsNumber()
    @Min(0)
    ROM: number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;

    @IsObject()
    specifications: {
        screen_info: string;
        CPU: string;
        rear_camera: string;
        battery: string;
        OS: string;
    };
    
    @IsArray()
    colors: [{ 
        color: string, 
        extra_price: number 
    }]
}