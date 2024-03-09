import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import { CompanyRepository } from '../companies/company.repository';
import { UserRepository } from '../users/user.repository';

@Module({
  controllers: [TasksController],
  providers: [ 
    {provide: "ITaskService", useClass: TasksService},
    {provide: "ITaskRepository", useClass: TaskRepository},
    {provide: "ICompanyRepository", useClass: CompanyRepository},
    {provide: "IUserRepository", useClass: UserRepository},
   ],
})
export class TasksModule {}
