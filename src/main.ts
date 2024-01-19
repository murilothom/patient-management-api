import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Gestão de Pacientes')
    .setDescription('API para gerenciar pacientes')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document);

  const port = 3000;
  await app.listen(port);
  console.log('******************************');
  console.log(`        SERVER RUNNING        `);
  console.log(`    Listening on port ${port} `);
  console.log('******************************');
}
bootstrap();
