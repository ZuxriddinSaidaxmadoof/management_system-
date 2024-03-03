import { ID } from 'src/common/types/type';
import { Postgres } from 'src/lib/pg';
import { UserEntity } from './entities/user.entity';


export class UserRepository
  extends Postgres
{
  async findOneByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.fetch<UserEntity, string>(
      'select * from users where login = $1',
      login
    );
  }

  async insert(entity: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity, string | number >(
      'insert into users(login, password, full_name, company_id, role, created_by) values ($1, $2,$3,$4,$5,$6) returning *',
      entity.login,
      entity.password,
      entity.full_name,
      entity.company_id,
      entity.role,
      entity.created_by
    );
  }

  // id SERIAL PRIMARY KEY,
  //   login VARCHAR UNIQUE NOT NULL,
  //   password VARCHAR NOT NULL,
  //   full_name VARCHAR (64) DEFAULT NULL,
  //   company_id int DEFAULT NULL,
  //   role role_type DEFAULT 'worker',
  //   created_at timestamp default CURRENT_TIMESTAMP,
  //   last_updated_at timestamp default CURRENT_TIMESTAMP,
  //   created_by int default null,
  //   last_updated_by int default null,


  async update(entity: UserEntity, id: number): Promise<UserEntity> {
    return await this.fetch<UserEntity, string | number | Date>(
      'update users set login = $1, password = $2, full_name = $3, company_id = $4, role = $5, last_updated_at = $6, last_updated_by = $7 where id = $8 returning *',
      entity.login,
      entity.password,
      entity.full_name,
      entity.company_id,
      entity.role,
      new Date(),
      entity.last_updated_by,
      id
    );
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.fetch<UserEntity, string | number>(
      'delete from users where id = $1 returning *',
      id
    );
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.fetchAll<UserEntity>('select * from users');
  }

  async findOneById(id: ID): Promise<UserEntity> {
    return await this.fetch<UserEntity, ID>(
      'select * from users where id = $1',
      id,
    );
  }
}
