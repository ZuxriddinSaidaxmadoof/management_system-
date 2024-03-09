import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  findAll(companyId?: number, currentUser?: UserEntity): Promise<ResData<Array<UserEntity>>>;
  create(
    dto: CreateUserDto
  ): Promise<ResData<UserEntity>>;
  findOne(id: ID): Promise<ResData<UserEntity>>;
  findOneByLogin(login: string): Promise<ResData<UserEntity>>;
  update(
    dto: UpdateUserDto,
    id: number,
  ): Promise<ResData<UserEntity>>;
  remove(id: ID): Promise<ResData<UserEntity>>;
  // findOneByName(name: string): Promise<ResData<UserEntity>>;
}
