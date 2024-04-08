import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { StatusReponse } from 'src/interfaces';
import { SaveUserDto } from './dto/save-user.dto';
import { Teams } from './entities/teams.entity';

@Injectable()
export class AppRepository {
  constructor(
    @InjectRepository(Users)
    private readonly pkUsersRepo: Repository<Users>,
    @InjectRepository(Teams)
    private readonly pkTeamsRepo: Repository<Teams>,
  ) {}

  // User
  public async getUser(id: number): Promise<Users> {
    return await this.pkUsersRepo.findOne({
      where: { id, indInativo: 0 },
    });
  }

  public async getUserLogin(username: string, senha: string): Promise<Users> {
    return await this.pkUsersRepo.findOne({ where: { username, senha } });
  }

  public async getAllUsers(): Promise<Users[]> {
    return await this.pkUsersRepo.find({ where: { indInativo: 0 } });
  }

  public async saveUser({
    username,
    senha,
    idade,
    indAdmin,
    indInativo,
  }: SaveUserDto): Promise<StatusReponse> {
    try {
      await this.pkUsersRepo.save({
        username,
        senha,
        idade,
        indAdmin,
        indInativo,
      });

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }

  public async deleteUser(id: number): Promise<StatusReponse> {
    try {
      await this.pkUsersRepo
        .createQueryBuilder()
        .delete()
        .where('ID = :id', { id })
        .execute();

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }

  // Teams
  public async getTeam(idOwner: number): Promise<Teams[]> {
    return await this.pkTeamsRepo.find({ where: { idOwner } });
  }
}
