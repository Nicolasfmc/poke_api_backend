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
      host: 'postgres://rqiwwkpv:easCX2HNzuZ9w4vnfI1D_7MSNhqeWGtb@isabelle.db.elephantsql.com/rqiwwkpv',
      port: 5432,
      username: 'rqiwwkpv',
      password: 'easCX2HNzuZ9w4vnfI1D_7MSNhqeWGtb',
      database: 'rqiwwkpv',
      entities: [Users, Teams],
    }),
    TypeOrmModule.forFeature([AppRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
