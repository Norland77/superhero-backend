import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateSuperheroDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  nickname?: string;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  real_name?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200)
  origin_description?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200)
  superpowers?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200)
  catch_phrase?: string;
}
