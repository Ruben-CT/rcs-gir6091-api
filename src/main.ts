import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',

  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));


  app.enableCors();

  // Configuración de swagger
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Getion de tareas')
    .setVersion('1.0')
    .addTag('tasks') // Agregar los endpoints bajo la etiqueta 'Tasks'
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(process.env.PORT ?? 3000);
  console.log("API is running on http://localhost:3000");
}
bootstrap();

//? npm i --save @nestjs/swagger

