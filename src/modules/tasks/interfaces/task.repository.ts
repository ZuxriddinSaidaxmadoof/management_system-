import { ID } from 'src/common/types/type';
import { TaskEntity } from '../entities/task.entity';

export interface ITaskRepository {
  insert(entity: TaskEntity): Promise<TaskEntity>;
  update(entity: TaskEntity, id: number): Promise<TaskEntity>;
  findOneById(id: ID): Promise<TaskEntity>;
  getByUserId(id: ID): Promise<Array<TaskEntity>>;
  findOneByName(name: string): Promise<TaskEntity | undefined>;
  remove(id: ID): Promise<TaskEntity | undefined>;
  findAll(): Promise<Array<TaskEntity>>;
}
