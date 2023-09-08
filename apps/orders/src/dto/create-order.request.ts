import { IsNotEmpty, IsString, IsPositive, IsPhoneNumber } from "class-validator";

export class CreateOrderRequest {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsPositive()
    readonly price: string;

    @IsPhoneNumber()
    readonly phoneNumber: string;
}