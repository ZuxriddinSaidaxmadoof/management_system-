import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompanyRepository } from './company.repository';

@Module({
  controllers: [CompaniesController],
  providers: [
    {provide: 'ICompanyService', useClass: CompaniesService},
    {provide: 'ICompanyRepository', useClass: CompanyRepository}
  ],
})
export class CompaniesModule {}
