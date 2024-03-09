import { ID } from 'src/common/types/type';
import { UserTaskEntity } from '../entities/user-task.entity';

export interface IUserTaskRepository {
  insert(entity: UserTaskEntity): Promise<UserTaskEntity>;
  update(entity: UserTaskEntity, id: number): Promise<UserTaskEntity>;
  findOneById(id: ID): Promise<UserTaskEntity>;
  getByUserId(id: ID): Promise<Array<UserTaskEntity>>;
  findOneByName(name: string): Promise<UserTaskEntity | undefined>;
  remove(id: ID): Promise<UserTaskEntity | undefined>;
  findAll(): Promise<Array<UserTaskEntity>>;
}
