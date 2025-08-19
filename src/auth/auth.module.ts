import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenStrategy } from './strategies/AccessTokenStrategy';
import { Refreshtokenstrategy } from './strategies/RefreshTokenStrategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, Refreshtokenstrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],
})
export class AuthModule {}
