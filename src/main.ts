import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as path from 'path';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
  const config = new DocumentBuilder()
    .setTitle(`Murang'a University of Technology`)
    .setDescription('School system')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, {customCssUrl: CSS_URL});

  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      '../swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: ${pathToSwaggerJson}`);
  }

  await app.listen(5000);
}
bootstrap();
