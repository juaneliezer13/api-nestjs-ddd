import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { urlencoded, json } from 'express';

const hasAuth = true;
const tagsSwagger = [
  'Productos',
];

function swaggerConfig() {
  let builder = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version);
  for(let tag of tagsSwagger) {
    builder = builder.addTag(tag);
  }
  if (process.env.NODE_ENV === 'production') {
    const val = process.env.npm_package_name.substring(7);
    builder.addServer(`/api/${val}`, 'Produccion');
  }
  if (hasAuth) {
    builder = builder.addBearerAuth();
  }
  return builder.build();
}

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(json({ limit: `${process.env.API_JSON_LIMIT_SIZE}` }));
  app.use(urlencoded({ extended: true, limit: `${process.env.API_JSON_LIMIT_SIZE}` }));
  const config = swaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.MY_PORT_HTTP);
}
bootstrap();