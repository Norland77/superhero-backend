import { Injectable } from '@nestjs/common';
import { SuperheroRepository } from './superhero.repository';
import { CreateSuperheroDto } from './dto/superhero.dto';
import { ObjectId } from 'mongoose';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { IHeroImg } from './schemas/superhero.schema';

@Injectable()
export class SuperheroService {
  constructor(private readonly superheroRepository: SuperheroRepository) {}

  async createSuperhero(dto: CreateSuperheroDto, file) {
    return this.superheroRepository.createSuperhero(dto, file);
  }

  async getSuperheroByName(nickname: string, realName: string) {
    return this.superheroRepository.getSuperheroByName(nickname, realName);
  }

  async getSuperheroById(id: ObjectId) {
    return this.superheroRepository.getSuperheroById(id);
  }

  async updateHeroById(id: ObjectId, dto: UpdateSuperheroDto, file) {
    return this.superheroRepository.updateHeroById(id, dto, file);
  }

  async deleteHeroById(id: ObjectId) {
    return this.superheroRepository.deleteHeroById(id);
  }

  async getAllHero(limitQ: number, offsetQ: number) {
    return this.superheroRepository.getAllHero(limitQ, offsetQ);
  }

  async getHeroById(id: ObjectId) {
    return this.superheroRepository.getHeroById(id);
  }

  async deleteHeroImg(filePath: string, heroId: ObjectId) {
    return this.superheroRepository.deleteHeroImg(filePath, heroId);
  }
}
