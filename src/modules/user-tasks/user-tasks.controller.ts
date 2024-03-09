import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { IUserTaskService } from './interfaces/userTask.service';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('user-tasks')
export class UserTasksController {
  constructor(@Inject("IUserTaskService") private readonly userTasksService: IUserTaskService) {}

  @Post()
  create(@Body() createUserTaskDto: CreateUserTaskDto, @CurrentUser() currentUser: UserEntity) {
    return this.userTasksService.create(createUserTaskDto, currentUser.id );
  }

  @Get()
  findAll() {
    return this.userTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTaskDto: UpdateUserTaskDto) {
    return this.userTasksService.update(updateUserTaskDto, Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTasksService.remove(+id);
  }
}
