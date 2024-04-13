import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { StatusReponse } from 'src/interfaces';
import { SaveUserDto } from './dto/save-user.dto';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from './dto/save-team.dto';

@Injectable()
export class AppRepository {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Users)
    private readonly pkUsersRepo: Repository<Users>,
    @InjectRepository(Teams)
    private readonly pkTeamsRepo: Repository<Teams>,
  ) {}

  // User
  public async getUser(id: number): Promise<Users> {
    return await this.entityManager.query(
      `SELECT * FROM PK_USERS WHERE ID = ${id} AND IND_INATIVO = 0`,
    );
  }

  public async getUserLogin(username: string, senha: string): Promise<Users> {
    const query = `SELECT * FROM PK_USERS WHERE username = '${username}' AND senha = '${senha}' AND IND_INATIVO = 0`;

    return await this.entityManager.query(query);
  }

  public async getAllUsers(): Promise<Users[]> {
    const query = `SELECT * FROM PK_USERS WHERE IND_INATIVO = 0`;

    return await this.entityManager.query(query);
  }

  // TODO: criar query de update
  public async saveUser({
    username,
    senha,
    idade,
    indAdmin,
    indInativo,
  }: SaveUserDto): Promise<StatusReponse> {
    try {
      const query = `INSERT INTO PK_USERS (USERNAME, SENHA, IDADE, INDADMIN, INDINATIVO) VALUES ('${username}', '${senha}', ${idade}, ${indAdmin}, ${indInativo})`;
      await this.entityManager.query(query);

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }

  public async deleteUser(id: number): Promise<StatusReponse> {
    try {
      const query = `DELETE FROM PK_USERS WHERE ID = ${id}`;
      await this.entityManager.query(query);

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }

  // Teams
  public async getTeam(idOwner: number): Promise<Teams[]> {
    try {
      const query = `SELECT * FROM PK_TEAMS WHERE ID_OWNER = ${idOwner}`;

      return await this.entityManager.query(query);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteTeam(idOwner: number): Promise<StatusReponse> {
    try {
      const query = `DELETE FROM PK_TEAMS WHERE ID_OWNER = ${idOwner}`;
      await this.entityManager.query(query);

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }

  // TODO: criar query de update
  public async saveTeam({
    idOwner,
    pokemonId,
    pokemonName,
  }: SaveTeamDto): Promise<StatusReponse> {
    try {
      const query = `INSERT INTO PK_TEAMS (ID_OWNER, POKEMON_ID, POKEMON_NAME) VALUES (${idOwner}, ${pokemonId}, '${pokemonName}')`;
      await this.entityManager.query(query);

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }
}
