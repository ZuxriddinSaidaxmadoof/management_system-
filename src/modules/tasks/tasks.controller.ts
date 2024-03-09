import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, Inject, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { ITaskService } from './interfaces/task.service';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { ICompanyRepository } from '../companies/interfaces/company.repository';

@ApiTags("Tasks")
@Controller('tasks')
@Injectable()
export class TasksController {
  constructor(@Inject("ITaskService") private readonly tasksService: ITaskService) {}

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() currentUser: UserEntity ) {
    return this.tasksService.create(createTaskDto, currentUser.id);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.WORKER)
  @Get('by-company/:id')
  getByUserId(@Param('id') id: string) {
    return this.tasksService.getByUserId(Number(id));
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto, Number(id));
  }

  @Auth(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(Number(id));
  }
}
