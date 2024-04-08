import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepo: AppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  getUser(id: number): Promise<Users> {
    return this.appRepo.getUser(id);
  }

  getAllUsers(): Promise<Users[]> {
    return this.appRepo.getAllUsers();
  }
}
