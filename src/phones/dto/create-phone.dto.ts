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
    quantity: number;

    @IsObject()
    specifications: {
        screen_info: string;
        CPU: string;
        rear_camera: string;
        battery: string;
        OS: string;
    };
    
    @IsArray()
    memory: [{ 
        Ram: number;
        Rom: number;
        color: [{
            HexRGB: string;
            price: number;
        }], 
    }]
}