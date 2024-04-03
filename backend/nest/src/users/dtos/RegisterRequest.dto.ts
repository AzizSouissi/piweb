import { Role } from "src/roles/dtos/Role"

export class RegisterRequest{
    firstname : string
    lastname : string 
    email: string 
    address : string 
    birthday : string
    degree : string 
    number : number
    password : string 
    roles : Role[]
}