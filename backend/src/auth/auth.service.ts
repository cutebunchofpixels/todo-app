import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SigninDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponseDto> {
    const user = this.userRepo.create(dto);
    const savedUser = await this.userRepo.save({
      ...user,
      password: await bcrypt.hash(dto.password, 10),
    });

    const tokens = this.generateTokens(savedUser.id, savedUser.email);
    await this.updateRefreshTokenHash(savedUser.id, tokens.refreshToken);

    return { user: this.omitUserFields(savedUser), ...tokens };
  }

  async signin(dto: SigninDto): Promise<AuthResponseDto> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new ForbiddenException('Credentials do not match');
    }

    const hashMatches = await bcrypt.compare(dto.password, user.password);
    if (!hashMatches) {
      throw new ForbiddenException('Credentials do not match');
    }

    const tokens = this.generateTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return { user: this.omitUserFields(user), ...tokens };
  }

  async logout(userId: number) {
    await this.userRepo.update({ id: userId }, { refreshTokenHash: null });
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new ForbiddenException('Credentials do not match');
    }

    const hashMatches = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!hashMatches) {
      throw new ForbiddenException('Credentials do not match');
    }

    const tokens = this.generateTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return { user: this.omitUserFields(user), ...tokens };
  }

  private generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKENT_EXPIRATION_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKENT_EXPIRATION_TIME,
    });

    return { accessToken, refreshToken };
  }

  private omitUserFields(user: User): UserResponseDto {
    const { password, refreshTokenHash, ...result } = user;

    return result;
  }

  private async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update({ id: userId }, { refreshTokenHash: hash });
  }
}
