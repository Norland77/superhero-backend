import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { SuperheroService } from "./superhero.service";
import { CreateSuperheroDto } from "./dto/superhero.dto";

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post('create')
  async createSuperhero(@Body() dto: CreateSuperheroDto) {
    console.log(dto);
    const hero = await this.superheroService.getSuperheroByName(
      dto.nickname,
      dto.real_name,
    );
    if (hero) {
      throw new BadRequestException(
        'This nickname or real name is already in use',
      );
    }
    return await this.superheroService.createSuperhero(dto);
  }
}
