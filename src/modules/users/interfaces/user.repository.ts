import { ID } from 'src/common/types/type';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  insert(entity: UserEntity): Promise<UserEntity>;
  update(entity: UserEntity, id: number): Promise<UserEntity>;
  findOneById(id: ID): Promise<UserEntity>;
  findOneByLogin(login: string): Promise<UserEntity | undefined>;
  remove(id: ID): Promise<UserEntity | undefined>;
  findAll(): Promise<Array<UserEntity>>;
}
