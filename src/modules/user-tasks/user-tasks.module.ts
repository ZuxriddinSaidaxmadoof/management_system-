import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { UserTasksController } from './user-tasks.controller';
import { UserTaskRepository } from './userTask.repository';

@Module({
  controllers: [UserTasksController],
  providers: [
    {provide: "IUserTaskService", useClass: UserTasksService},
    {provide: "IUserTaskRepository", useClass: UserTaskRepository }
  ]
})
export class UserTasksModule {}
