import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsInt()
  parentId?: number;
}
