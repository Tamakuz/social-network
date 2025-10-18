import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @MinLength(3)
  @IsString()
  @IsOptional()
  name?: string;
}