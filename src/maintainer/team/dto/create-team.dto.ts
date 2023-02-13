import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  shortName: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  description?: string;

  
}



















