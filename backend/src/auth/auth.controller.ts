import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { refreshTokenCookieOptions } from './constants';
import { SigninDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signup(dto);

    response.cookie(
      'refreshToken',
      result.refreshToken,
      refreshTokenCookieOptions,
    );

    return { user: result.user, accessToken: result.accessToken };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() dto: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signin(dto);

    response.cookie(
      'refreshToken',
      result.refreshToken,
      refreshTokenCookieOptions,
    );

    return { user: result.user, accessToken: result.accessToken };
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const payload = request.user as JwtPayload;
    response.clearCookie('refreshToken', refreshTokenCookieOptions);
    this.authService.logout(payload.sub);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const payload = request.user as JwtPayload;
    const refreshToken = request.cookies['refreshToken'];
    const result = await this.authService.refresh(payload.sub, refreshToken);

    response.cookie(
      'refreshToken',
      result.refreshToken,
      refreshTokenCookieOptions,
    );

    return { user: result.user, accessToken: result.accessToken };
  }
}
