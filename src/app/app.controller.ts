import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { GetUserDto } from './dto/get-user.dto';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserRes, StatusResponse } from 'src/interfaces';
import { RegisterUserDto } from './dto/register-user.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from './dto/save-team.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { DeleteTeamDto } from './dto/delete-team.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user/get-user')
  @UseGuards(JwtAuthGuard)
  getUser(@Query() data: GetUserDto): Promise<Users> {
    return this.appService.getUser(data.id);
  }

  @Get('/user/get-all')
  @UseGuards(JwtAuthGuard)
  getAllUsers(): Promise<Users[]> {
    return this.appService.getAllUsers();
  }

  @Get('/user/get-user-login')
  @UseGuards(JwtAuthGuard)
  getUserLogin(@Query() data: GetUserLoginDto): Promise<Users> {
    return this.appService.getUserLogin(data.username, data.senha);
  }

  @Put('/user/register-user')
  @UseGuards(JwtAuthGuard)
  registerUser(@Body() data: RegisterUserDto): Promise<RegisterUserRes> {
    return this.appService.registerUser(data);
  }

  @Patch('/user/update-user')
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() data: UpdateUserDto): Promise<StatusResponse> {
    return this.appService.updateUser(data);
  }

  @Delete('/user/delete-user')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Query() data: DeleteUserDto): Promise<StatusResponse> {
    return this.appService.deleteUser(data.id);
  }

  /**
   * teams
   */
  @Get('/team/get-team')
  @UseGuards(JwtAuthGuard)
  getTeam(@Query() data: GetTeamDto): Promise<Teams[]> {
    return this.appService.getTeam(data.idOwner);
  }

  @Post('/team/save-team')
  @UseGuards(JwtAuthGuard)
  saveTeam(@Body() data: SaveTeamDto[]): Promise<StatusResponse> {
    return this.appService.saveTeam(data);
  }

  @Delete('/team/delete-team')
  @UseGuards(JwtAuthGuard)
  deleteTeam(@Query() data: DeleteTeamDto): Promise<StatusResponse> {
    return this.appService.deleteTeam(data.idOwner);
  }
}
