import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Superhero, SuperheroDocument } from './schemas/superhero.schema';
import { CreateSuperheroDto } from './dto/superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Injectable()
export class SuperheroRepository {
  constructor(
    @InjectModel(Superhero.name)
    private readonly superhero: Model<SuperheroDocument>,
  ) {}

  async createSuperhero(dto: CreateSuperheroDto, file) {
    let image;
    const images = [];
    for (let i = 0; i < file.length; i++) {
      image = {
        name: file[i].filename,
        path: file[i].path,
      };
      images.push(image);
    }
    const newSuperhero = new this.superhero({
      nickname: dto.nickname,
      real_name: dto.real_name,
      origin_description: dto.origin_description,
      superpowers: dto.superpowers,
      catch_phrase: dto.catch_phrase,
      images: images,
    });
    return this.superhero.create(newSuperhero);
  }

  async getSuperheroByName(
    nickname: string,
    realName: string,
  ): Promise<SuperheroDocument> {
    return this.superhero.findOne({
      $or: [{ nickname: nickname }, { real_name: realName }],
    });
  }

  async getSuperheroById(id: ObjectId): Promise<SuperheroDocument> {
    return this.superhero.findById(id);
  }

  async updateHeroById(id: ObjectId, dto: UpdateSuperheroDto, file) {
    console.log(file);
    let image;
    const images = [];
    for (let i = 0; i < file.length; i++) {
      image = {
        name: file[i].filename,
        path: file[i].path,
      };
      images.push(image);
    }
    const updateFields = {
      nickname: dto.nickname,
      real_name: dto.real_name,
      origin_description: dto.origin_description,
      superpowers: dto.superpowers,
      catch_phrase: dto.catch_phrase,
      images: images,
    };
    console.log(updateFields);
    return this.superhero.findOneAndUpdate({ _id: id }, updateFields, {
      new: true,
    });
  }

  async deleteHeroById(id: ObjectId) {
    return this.superhero.findOneAndDelete({ _id: id });
  }

  async getAllHero(limit: number, offset: number) {
    const heroAmount = (await this.superhero.find({})).length;
    const allHero = await this.superhero.find().skip(offset).limit(limit);
    console.log(allHero);
    return {
      limit: limit,
      offset: offset,
      total: heroAmount,
      superhero: allHero.map((superhero) => {
        return {
          _id: superhero._id,
          nickname: superhero.nickname,
          images: superhero.images,
        };
      }),
    };
  }

  async getHeroById(id: ObjectId) {
    return this.superhero.findOne({ _id: id });
  }

  async deleteHeroImg(filePath: string, heroId: ObjectId) {
    return this.superhero.findOneAndUpdate(
      { _id: heroId },
      { $pull: { images: { name: filePath } } },
      { new: true },
    );
  }
}
