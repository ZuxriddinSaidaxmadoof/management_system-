import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../entities/company.entity';

export interface ICompanyRepository {
  insert(entity: CompanyEntity): Promise<CompanyEntity>;
  update(entity: CompanyEntity, id: number): Promise<CompanyEntity>;
  findOneById(id: ID): Promise<CompanyEntity>;
  findOneByName(name: string): Promise<CompanyEntity | undefined>;
  remove(id: ID): Promise<CompanyEntity | undefined>;
  findAll(): Promise<Array<CompanyEntity>>;
}
