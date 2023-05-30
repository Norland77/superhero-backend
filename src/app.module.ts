import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperheroModule } from './superhero/superhero.module';

const mongoConnection = MongooseModule.forRoot(
  'mongodb+srv://nikitafoka2017:GRIkBYIL05ODE8Cw@cluster0.nh4acqt.mongodb.net/',
);
@Module({
  imports: [mongoConnection, SuperheroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
