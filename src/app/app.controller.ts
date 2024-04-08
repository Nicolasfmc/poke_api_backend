import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { GetUserDto } from './dto/get-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/get-user')
  getUser(@Query() data: GetUserDto): Promise<Users> {
    return this.appService.getUser(data.id);
  }
}
