import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { ICompanyRepository } from '../companies/interfaces/company.repository';
import { IUserRepository } from '../users/interfaces/user.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { ITaskRepository } from './interfaces/task.repository';
import { ITaskService } from './interfaces/task.service';

@Injectable()
export class TasksService implements ITaskService{
  constructor(
  @Inject("ITaskRepository") private readonly repository: ITaskRepository, 
  @Inject("ICompanyRepository") private readonly companyRepository: ICompanyRepository,
  @Inject("IUserRepository") private readonly userRepository: IUserRepository
  ){}
  async create(createTaskDto: CreateTaskDto, createdBy: number) {
    const taskEntity = new TaskEntity(createTaskDto);
    const foundCompany = await this.companyRepository.findOneById(taskEntity.company_id);
    if(!foundCompany){
      throw new BadRequestException("Company not found")
    }
    taskEntity.created_by = createdBy;
    const data = await this.repository.insert(taskEntity);
    return new ResData("Task created successfully", 201, data);
  }

  async findAll() {
    const data = await this.repository.findAll();
    return new ResData("All tasks", 200, data);
  }

  async findOne(id: number) {
    const data = await this.repository.findOneById(id);
    if(!data){
      throw new BadRequestException("Task not found by id")
    }
    return new ResData("One task by id", 200, data);
  }

  async getByUserId(id: number) {
    const data = await this.companyRepository.findOneById(id);
    if(!data){
      throw new BadRequestException("company not found")
    }
    const tasks = await this.repository.getByUserId(id)
    return new ResData("tasks by company id", 200, tasks);
  }

  async update(updateTaskDto: UpdateTaskDto, id: number) {
    const {data: oldData} =  await this.findOne(id);
    const data = Object.assign(oldData, updateTaskDto);

    const foundCompany = await this.companyRepository.findOneById(data.company_id);
    if(!foundCompany){
      throw new BadRequestException("Company not found")
    }

    const updated = await this.repository.update(data, id);
    return new ResData("Task updated successfully", 200, updated);
  }

  async remove(id: number) {
    const data = await this.repository.remove(id);
    return new ResData("Task deleted successfully", 200, data);
  }
}
