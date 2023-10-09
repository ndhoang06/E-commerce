import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Post('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const googleId = req.user;
    return this.authService.googleLogin(googleId);
  }
}
