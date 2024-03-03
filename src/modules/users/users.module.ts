import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: "IUserservice", useClass: UsersService },
    { provide: "IUserRepository",  useClass: UserRepository}
  ],
})
export class UsersModule {}
