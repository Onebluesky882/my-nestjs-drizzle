import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
const fakerUsers = [
  {
    id: 1,
    username: 'anson',
    password: '123',
  },
  {
    id: 2,
    username: 'jack',
    password: '1234',
  },
];
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = fakerUsers.find((user) => user.username === username);
    if (!findUser) {
      console.log('user not found');
    }

    if (password !== findUser?.password) {
      console.log('Incorrect password');
      return null;
    }

    const { password: _, ...user } = findUser;
    return { user };
  }

  login(user: any) {
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
