import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000', '*'] })
  await app.listen(5432);
}
main();
