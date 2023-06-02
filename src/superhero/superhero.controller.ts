import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { ObjectId } from 'mongoose';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';
import * as fs from 'fs';
import { ValidateMongooseIdPipe } from '../pipes/validate-mongoose-id.pipe';

export const storage = {
  storage: diskStorage({
    destination: './uploads/heroImg',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post('create')
  @UseInterceptors(AnyFilesInterceptor(storage))
  async createSuperhero(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateSuperheroDto,
  ) {
    const hero = await this.superheroService.getSuperheroByName(
      dto.nickname,
      dto.real_name,
    );
    if (hero) {
      throw new BadRequestException(
        'This nickname or real name is already in use',
      );
    }
    of(files);
    return await this.superheroService.createSuperhero(dto, files);
  }

  @Put(':heroId')
  @UseInterceptors(AnyFilesInterceptor(storage))
  async updateHeroById(
    @Param('heroId', ValidateMongooseIdPipe) heroId: ObjectId,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: UpdateSuperheroDto,
  ) {
    if (!heroId) {
      throw new HttpException('Incorrect playerId', 400);
    }
    const hero = this.superheroService.getSuperheroById(heroId);
    if (!hero) {
      throw new HttpException('No users with such id', 400);
    }
    const heroName = await this.superheroService.getSuperheroByName(
      dto.nickname,
      dto.real_name,
    );
    if (heroName) {
      throw new BadRequestException(
        'This nickname or real name is already in use',
      );
    }
    await this.superheroService.updateHeroById(heroId, dto, files);

    return {
      message: `Player with this id ${heroId} was updated successfully`,
    };
  }

  @Delete(':heroId')
  async deleteHeroById(
    @Param('heroId', ValidateMongooseIdPipe) heroId: ObjectId,
  ) {
    if (!heroId) {
      throw new HttpException('Incorrect playerId', 400);
    }
    const hero = this.superheroService.getSuperheroById(heroId);
    if (!hero) {
      throw new HttpException('No users with such id', 400);
    }

    await this.superheroService.deleteHeroById(heroId);

    return {
      message: `Player with this id ${heroId} was delete successfully`,
    };
  }

  @Get()
  async getAllHero(@Query('limit') limitQ = 9, @Query('offset') offsetQ = 0) {
    return this.superheroService.getAllHero(limitQ, offsetQ);
  }

  @Get(':heroId')
  async getHeroById(@Param('heroId', ValidateMongooseIdPipe) heroId: ObjectId) {
    return this.superheroService.getHeroById(heroId);
  }

  @Delete('image/delete/:heroId/:fileName')
  async deleteHeroImg(
    @Param('fileName') fileName: string,
    @Param('heroId', ValidateMongooseIdPipe) heroId: ObjectId,
  ) {
    console.log(fileName);
    console.log(heroId);
    await fs.unlink(`./uploads/heroImg/${fileName}`, () => {
      return this.superheroService.deleteHeroImg(fileName, heroId);
    });
  }
}
