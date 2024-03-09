import { Inject, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { UserTaskEntity } from './entities/user-task.entity';
import { IUserTaskRepository } from './interfaces/userTask.repository';
import { IUserTaskService } from './interfaces/userTask.service';

@Injectable()
export class UserTasksService implements IUserTaskService {
  constructor(
  @Inject("IUserTaskRepository") private readonly repository: IUserTaskRepository
  ){}

  
  findAll(): Promise<ResData<UserTaskEntity[]>> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<ResData<UserTaskEntity>> {
    throw new Error('Method not implemented.');
  }
  getByUserId(id: number): Promise<ResData<UserTaskEntity[]>> {
    throw new Error('Method not implemented.');
  }
  update(dto: UpdateUserTaskDto, id: number): Promise<ResData<UserTaskEntity>> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<ResData<UserTaskEntity>> {
    throw new Error('Method not implemented.');
  }
  findOneByName(name: string): Promise<ResData<UserTaskEntity>> {
    throw new Error('Method not implemented.');
  }
  async create(createUserTaskDto: CreateUserTaskDto) {
    const entity = new UserTaskEntity(createUserTaskDto);
    const data = await this.repository.insert(entity);
    return new ResData("user-task created", 201, data);
  }
}
