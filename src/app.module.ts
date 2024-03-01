import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { UserTasksModule } from './modules/user-tasks/user-tasks.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, TasksModule, CompaniesModule, UserTasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
