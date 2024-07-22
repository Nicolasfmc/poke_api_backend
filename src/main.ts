import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cors from 'cors'

async function main() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())

  await app.listen(5432);
}
main();
