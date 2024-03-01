import { ID } from 'src/common/types/type';
import { ICompanRepository } from './interfaces/company.repository';
import { Postgres } from 'src/lib/pg';
import { CompanyEntity } from './entities/company.entity';

export class CompanyRepository
  extends Postgres
  implements ICompanRepository
{
  async findOneByName(name: string): Promise<CompanyEntity | undefined> {
    return await this.fetch<CompanyEntity, string>(
      'select * from companies where name = $1',
      name
    );
  }

  async insert(entity: CompanyEntity): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, string >(
      'insert into companies(name) values ($1) returning *',
      entity.name
    );
  }


  async update(entity: CompanyEntity, id: number): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, string | number>(
      'update companies set name = $1 where id = $7 returning *',
      entity.name,
      id
    );
  }

  async remove(id: number): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, string | number>(
      'delete from companies where id = $1 returning *',
      id
    );
  }

  async findAll(): Promise<Array<CompanyEntity>> {
    return await this.fetchAll<CompanyEntity>('select * from companies');
  }

  async findOneById(id: ID): Promise<CompanyEntity> {
    return await this.fetch<CompanyEntity, ID>(
      'select * from companies where id = $1',
      id,
    );
  }
}
