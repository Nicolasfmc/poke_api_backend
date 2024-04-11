import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { Teams } from './entities/teams.entity';
import { AppRepository } from './app.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'isabelle.db.elephantsql.com',
      port: 5432,
      username: 'rqiwwkpv',
      password: 'easCX2HNzuZ9w4vnfI1D_7MSNhqeWGtb',
      database: 'rqiwwkpv',
    }),
    TypeOrmModule.forFeature([Users, Teams]),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
  exports: [AppRepository],
})
export class AppModule {}
