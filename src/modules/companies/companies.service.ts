import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompanyRepository } from './interfaces/company.repository';
import { ICompanyService } from './interfaces/company.service';
import { ResData } from 'src/lib/resData';

@Injectable()
export class CompaniesService implements ICompanyService {
  constructor(@Inject("ICompanyRepository") private readonly repository: ICompanyRepository){}
  async create(createCompanyDto: CreateCompanyDto) {
    const foundCompany = await this.repository.findOneByName(createCompanyDto.name);
    if(foundCompany){
      throw new BadRequestException("This name already exist");
    }
    const newCompany = await this.repository.insert(createCompanyDto);
    return new ResData("Company created", 201, newCompany);
  }

  async findAll() {
    const data = await this.repository.findAll();
    return new ResData("All Companies", 200, data)
  }

  async findOne(id: number) {
    const foundCompany = await this.repository.findOneById(id);
    if(!foundCompany){
      throw new NotFoundException("Company not found")
    }
    return new ResData("Found Company by id", 200, foundCompany);
  }

  async findOneByName(name: string) {
    const foundCompany = await this.repository.findOneByName(name);
    if(!foundCompany){
      throw new NotFoundException("Company not found");
    }

    return new ResData("Found one by name", 200, foundCompany);
  }
  async update(updateCompanyDto: CreateCompanyDto, id: number) {
     await this.findOne(id);
     const updated = await this.repository.update(updateCompanyDto, id)
    return new ResData("Updated succussfully", 200, updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleted = await this.repository.remove(id);
    return new ResData("deleted successfully", 200, deleted);
  }
}
