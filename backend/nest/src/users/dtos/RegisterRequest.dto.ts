import { Role } from "src/roles/dtos/Role"
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class RegisterRequest{

    @IsString()
    @IsNotEmpty()
    firstname : string
    @IsString()
    @IsNotEmpty()
    lastname : string 
    @IsString()
    @IsEmail()
    email: string 
    @IsNotEmpty()
    address : string 
    @IsNotEmpty()
    birthday : string
    @IsNotEmpty()
    degree : string 
    @IsNotEmpty()
    number : number
    @IsNotEmpty()
    job : string 
    password : string 
    roles : Role[]
}