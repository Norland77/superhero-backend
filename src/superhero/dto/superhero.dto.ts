import { IsString, Length } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @Length(3, 30)
  nickname: string;

  @IsString()
  @Length(3, 30)
  real_name: string;

  @IsString()
  @Length(10, 2000)
  origin_description: string;

  @IsString()
  @Length(10, 200)
  superpowers: string;

  @IsString()
  @Length(10, 200)
  catch_phrase: string;
  images: IHeroImg[];
}

export interface IHeroImg {
  name: string;
  path: string;
}
