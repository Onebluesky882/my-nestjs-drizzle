import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() authPayload: AuthPayloadDto) {
    console.log('Received payload:', authPayload);
    const user = this.authService.validateUser(authPayload);
    if (!user) {
      throw new HttpException('Invalid Credentals', 401);
    }
    return user;
  }
}
