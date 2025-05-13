import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '../users/schema';
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
    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
    });
    return { user, token };
  }

  // async signIn(name: string) {
  //   const user = await this.userService.findOne(name);
  //   if (user.) return new UnauthorizedException();

  // }
}
