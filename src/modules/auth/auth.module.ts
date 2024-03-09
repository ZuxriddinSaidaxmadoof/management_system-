import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: config.jwtExpiredIn },
    })
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IUserService', useClass: UsersService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class AuthModule {}
