import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const googleId = req.user;
    return this.authService.googleLogin(googleId);
  }

  @Get('google')
  async loginWithGoogle(@Body() body: { code: string }) {
    const payload = await this.authService.verifyGoogleToken(body.code)
  }
}
