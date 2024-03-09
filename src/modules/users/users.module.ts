import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { CompaniesService } from '../companies/companies.service';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  controllers: [UsersController],
  imports: [CompaniesModule],
  providers: [
    { provide: "IUserservice", useClass: UsersService },
    { provide: "IUserRepository",  useClass: UserRepository}
    // { provide: "ICompanyService", useClass: CompaniesService }
  ],
})
export class UsersModule {}
