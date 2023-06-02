import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SuperheroDocument = Superhero & Document;
@Schema()
export class Superhero implements ISuperhero {
  @Prop({ required: false, unique: true })
  nickname: string;

  @Prop({ required: false, unique: true })
  real_name: string;

  @Prop({ required: false })
  origin_description: string;

  @Prop({ required: false })
  superpowers: string;

  @Prop({ required: false })
  catch_phrase: string;

  @Prop()
  images: IHeroImg[];
}

export const SuperheroSchema = SchemaFactory.createForClass(Superhero);

export interface ISuperhero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: IHeroImg[];
}

export interface IHeroImg {
  name: string;
  path: string;
}
