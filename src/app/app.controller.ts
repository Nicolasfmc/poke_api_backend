import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { GetUserDto } from './dto/get-user.dto';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { StatusReponse } from 'src/interfaces';
import { SaveUserDto } from './dto/save-user.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from './dto/save-team.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { DeleteTeamDto } from './dto/delete-team.dto copy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user/get-user')
  getUser(@Query() data: GetUserDto): Promise<Users> {
    return this.appService.getUser(data.id);
  }

  @Get('/user/get-all')
  getAllUsers(): Promise<Users[]> {
    return this.appService.getAllUsers();
  }

  @Get('/user/get-user-login')
  getUserLogin(@Query() data: GetUserLoginDto): Promise<Users> {
    return this.appService.getUserLogin(data.username, data.senha);
  }

  @Post('/user/save-user')
  saveUser(@Body() data: SaveUserDto): Promise<StatusReponse> {
    return this.appService.saveUser(data);
  }

  @Delete('/user/delete-user')
  deleteUser(@Query() data: DeleteUserDto): Promise<StatusReponse> {
    return this.appService.deleteUser(data.id);
  }

  // teams
  @Get('/team/get-team')
  getTeam(@Query() data: GetTeamDto): Promise<Teams[]> {
    return this.appService.getTeam(data.idOwner);
  }

  @Post('/team/save-team')
  saveTeam(@Body() data: SaveTeamDto[]): Promise<StatusReponse> {
    return this.appService.saveTeam(data);
  }

  @Delete('/team/delete-team')
  deleteTeam(@Query() data: DeleteTeamDto): Promise<StatusReponse> {
    return this.appService.deleteTeam(data.idOwner);
  }
}
