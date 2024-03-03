import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, Inject, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompanyService } from './interfaces/company.service';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags("Companies")
@Controller('companies')
export class CompaniesController {
  constructor(@Inject("ICompanyService") private readonly companiesService: ICompanyService) {}

  
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(Number(id));
  }
  
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Put(':id')
  update(@Body() updateCompanyDto: CreateCompanyDto, @Param('id') id: string) {
    return this.companiesService.update (updateCompanyDto, Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(Number(id));
  }
}
