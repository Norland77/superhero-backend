import { Module } from '@nestjs/common';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { Superhero, SuperheroSchema } from './schemas/superhero.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperheroRepository } from './superhero.repository';

const superheroFeature = MongooseModule.forFeature([
  { name: Superhero.name, schema: SuperheroSchema },
]);

@Module({
  imports: [superheroFeature],
  controllers: [SuperheroController],
  providers: [SuperheroService, SuperheroRepository],
  exports: [superheroFeature],
})
export class SuperheroModule {}
