import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './stategies/AccessTokenStategy';
import { RefreshTokenStrategy } from './stategies/RefreshTokenStrategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
