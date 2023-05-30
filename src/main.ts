import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
//nikitafoka2017   GRIkBYIL05ODE8Cw

//mongodb+srv://nikitafoka2017:GRIkBYIL05ODE8Cw@cluster0.nh4acqt.mongodb.net/
