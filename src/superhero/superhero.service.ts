import { Injectable } from '@nestjs/common';
import { SuperheroRepository } from './superhero.repository';
import { CreateSuperheroDto } from './dto/superhero.dto';

@Injectable()
export class SuperheroService {
  constructor(private readonly superheroRepository: SuperheroRepository) {}

  async createSuperhero(dto: CreateSuperheroDto) {
    return this.superheroRepository.createSuperhero(dto);
  }

  async getSuperheroByName(nickname: string, realName: string) {
    return this.superheroRepository.getSuperheroByName(nickname, realName);
  }
}
