import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SuperheroDocument = Superhero & Document;
@Schema()
export class Superhero implements ISuperhero {
  @Prop({ required: true, unique: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  real_name: string;

  @Prop({ required: true })
  origin_description: string;

  @Prop({ required: true })
  superpowers: string;

  @Prop({ required: true })
  catch_phrase: string;

  @Prop()
  images: string[];
}

export const SuperheroSchema = SchemaFactory.createForClass(Superhero);

export interface ISuperhero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
}
