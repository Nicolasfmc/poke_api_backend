import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../app.service';
import { GetUserLoginDto } from '../dto/get-user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appService: AppService,
  ) {}

  async login({ username, senha }: GetUserLoginDto) {
    const user = await this.validateUser(username, senha);

    if (user) {
      const payload = { username };
  
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }

  async validateUser(username: string, senha: string): Promise<any> {
    return await this.appService.getUserLogin(username, senha);
  }
}
