import { IsNotEmpty, IsString } from "class-validator";

export class CreateMissionDto {
    @IsNotEmpty()
    @IsString()
     title: string;
     description: string;
    @IsNotEmpty()
    @IsString()
     startDate: string;
    @IsNotEmpty()
    @IsString()
    endDate: string;
  }
  