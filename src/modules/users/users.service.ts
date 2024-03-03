import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository';
import { IUserService } from './interfaces/user.service';

@Injectable()
export class UsersService implements IUserService {
  constructor(@Inject("IUserRepository") private readonly repository: IUserRepository ){}
  async findAll(): Promise<ResData<UserEntity[]>> {
    const data = await this.repository.findAll(); 
    return new ResData("All users", 200, data);
  }
  async create(dto: CreateUserDto): Promise<ResData<UserEntity>> {
    const userEntity = new UserEntity(dto);

    const checkLoginExist = await this.repository.findOneByLogin(dto?.login);
    
    if(checkLoginExist){
      throw new BadRequestException("This login already exist");
    }

    const created = await this.repository.insert(userEntity);
    return new ResData("User created successfully", 201, created)
  }
  async findOne(id: number): Promise<ResData<UserEntity>> {
    const foundUser = await this.repository.findOneById(id);
    if(!foundUser){
      throw new NotFoundException("User not found");
    } 
    return new ResData("One user by id", 200, foundUser);
  }
  async findOneByLogin(login: string): Promise<ResData<UserEntity>> {
    const foundUser = await this.repository.findOneByLogin(login);
    if(!foundUser){
      throw new NotFoundException("User not found");
    } 
    return new ResData("One user by id", 200, foundUser);
  }
  async update(dto: UpdateUserDto, id: number): Promise<ResData<UserEntity>> {
    const { data: oldData } = await this.findOne(id);
    const checkLoginExist = await this.repository.findOneByLogin(dto?.login);
    
    if(checkLoginExist && dto?.login !== oldData.login){
      throw new BadRequestException("This login already exist");
    }
    const updateUser = Object.assign(oldData, dto);
    console.log(updateUser);
    const updated = await this.repository.update(updateUser, id);
    
    return new ResData("user updated", 200, updated);
  }
  async remove(id: number): Promise<ResData<UserEntity>> {
    await this.findOne(id);
    const deleted = await this.repository.remove(id);
    return new ResData("user deleted successfully", 200, deleted);
  }
  
}
