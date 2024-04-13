import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { AppRepository } from './app.repository';
import { SaveUserDto } from './dto/save-user.dto';
import { StatusReponse } from 'src/interfaces';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from './dto/save-team.dto';

@Injectable()
export class AppService {
  constructor(private readonly appRepo: AppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUser(id: number): Promise<Users> {
    return this.appRepo.getUser(id);
  }

  async getAllUsers(): Promise<Users[]> {
    return this.appRepo.getAllUsers();
  }

  async getUserLogin(username: string, senha: string): Promise<Users> {
    const result = await this.appRepo.getUserLogin(username, senha);

    if (Array.isArray(result) && result.length < 1) {
      throw new Error('Usuário não encontrado!');
    }

    return result;
  }

  async saveUser(data: SaveUserDto): Promise<StatusReponse> {
    return await this.saveUser(data);
  }

  async deleteUser(id: number): Promise<StatusReponse> {
    const deleteTeam = await this.deleteTeam(id);

    if (deleteTeam.status === 'ok') {
      return await this.deleteUser(id);
    } else {
      return deleteTeam;
    }
  }

  //teams
  async getTeam(idOwner: number): Promise<Teams[]> {
    return await this.appRepo.getTeam(idOwner);
  }

  async saveTeam(data: SaveTeamDto[]): Promise<StatusReponse> {
    try {
      await this.appRepo.deleteTeam(data[0].idOwner);

      for (const p of data) {
        await this.appRepo.saveTeam(p);
      }

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error ${err}` };
    }
  }

  async deleteTeam(idOwner: number): Promise<StatusReponse> {
    return this.appRepo.deleteTeam(idOwner);
  }
}
