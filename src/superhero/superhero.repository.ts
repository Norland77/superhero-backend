import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Superhero, SuperheroDocument } from './schemas/superhero.schema';
import { CreateSuperheroDto } from './dto/superhero.dto';

@Injectable()
export class SuperheroRepository {
  constructor(
    @InjectModel(Superhero.name)
    private readonly superhero: Model<SuperheroDocument>,
  ) {}

  async createSuperhero(dto: CreateSuperheroDto) {
    return this.superhero.create(dto);
  }

  async getSuperheroByName(nickname: string, realName: string) {
    return this.superhero.findOne({
      $or: [{ nickname: nickname }, { real_name: realName }],
    });
  }
}
