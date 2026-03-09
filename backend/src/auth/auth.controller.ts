import { Controller, Get, Req, Res, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // start oauth flow
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // initiates Google OAuth2 login
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res, @Query('inv') inv: string) {
    // Google has authenticated user and attached profile on req.user
    const jwt = await this.authService.handleGoogleCallback(req.user, inv);
    // redirect or return token
    return res.json(jwt);
  }

  constructor(private authService: AuthService) {}
}
