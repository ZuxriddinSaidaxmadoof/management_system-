import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyEntity } from '../entities/company.entity';

export interface ICompanyService {
  findOneById(id: ID): Promise<ResData<CompanyEntity>>;
  findAll(): Promise<ResData<Array<CompanyEntity>>>;
  create(
    dto: CreateCompanyDto
    // currentUser: UserEntity
  ): Promise<ResData<CompanyEntity>>;
  update(
    dto: UpdateCompanyDto,
    id: number,
  ): Promise<ResData<CompanyEntity>>;
  remove(id: ID): Promise<ResData<CompanyEntity>>;
}
