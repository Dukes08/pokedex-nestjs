import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   //now all the endpoints has the prefix api, so now the endpoint looks like http://3000/api/v2/pokemon
  app.setGlobalPrefix('api/v2')
  //to use pipes validations for the pokemon dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  //the await should be in the end always
  await app.listen(3000);

  
 
}
bootstrap();
