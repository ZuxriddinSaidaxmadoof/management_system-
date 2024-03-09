import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface ITaskService {
  findAll(): Promise<ResData<Array<TaskEntity>>>;
  create(
    dto: CreateTaskDto,
    createdBy: number
  ): Promise<ResData<TaskEntity>>;
  findOne(id: ID): Promise<ResData<TaskEntity>>;
  getByUserId(id: ID): Promise<ResData<Array<TaskEntity>>>;
  update(
    dto: UpdateTaskDto,
    id: number,
  ): Promise<ResData<TaskEntity>>;
  remove(id: ID): Promise<ResData<TaskEntity>>;
  // findOneByName(name: string): Promise<ResData<TaskEntity>>;
}
