import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { CreateUserTaskDto } from '../dto/create-user-task.dto';
import { UpdateUserTaskDto } from '../dto/update-user-task.dto';
import { UserTaskEntity } from '../entities/user-task.entity';

export interface IUserTaskService {
  findAll(): Promise<ResData<Array<UserTaskEntity>>>;
  create(
    dto: CreateUserTaskDto,
    createdBy: number
  ): Promise<ResData<UserTaskEntity>>;
  findOne(id: ID): Promise<ResData<UserTaskEntity>>;
  getByUserId(id: ID): Promise<ResData<Array<UserTaskEntity>>>;
  update(
    dto: UpdateUserTaskDto,
    id: number,
  ): Promise<ResData<UserTaskEntity>>;
  remove(id: ID): Promise<ResData<UserTaskEntity>>;
  findOneByName(name: string): Promise<ResData<UserTaskEntity>>;
}
