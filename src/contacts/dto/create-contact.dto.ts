import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    last_name:string;

    @IsString()
    phone_number:string;

    @IsString()
    picture_uri: string;

    @IsNumber()
    user_id?: number;
    //toca ponerlo como "user" a pesar de ponerlo como user_id
}
  

