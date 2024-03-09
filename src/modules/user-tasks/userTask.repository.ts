import { ID } from 'src/common/types/type';
import { Postgres } from 'src/lib/pg';
import { UserTaskEntity } from './entities/user-task.entity';
import { IUserTaskRepository } from './interfaces/userTask.repository';

export class UserTaskRepository
  extends Postgres
  implements IUserTaskRepository
{
  async findOneByName(name: string): Promise<UserTaskEntity | undefined> {
    return await this.fetch<UserTaskEntity, string>(
      'select * from user_tasks where name = $1',
      name
    );
  }


  async insert(entity: UserTaskEntity): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, string | number | Date >(
      'insert into user_tasks(user_id, task_id, start_at, end_at, status, day, last_updated_at, created_by, last_updated_by ) values ($1, $2,$3,$4,$5,$6,$7,$8,$9) returning *',
      entity.user_id,
      entity.task_id,
      entity.start_at,
      entity.end_at,
      entity.status,
      entity.day,
      entity.last_updated_at,
      entity.created_by,
      entity.last_updated_by
    );
  }

  async update(entity: UserTaskEntity, id: number): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, string | number | Date>(
      'update user_tasks set user_id = $1, task_id = $2, start_at = $3, end_at = $4, status = $5, day = $6, last_updated_at = $7, created_by = $8, last_updated_by = $9 where id = $10 returning *',
      entity.user_id,
      entity.task_id,
      entity.start_at,
      entity.end_at,
      entity.status,
      entity.day,
      entity.last_updated_at,
      entity.created_by,
      entity.last_updated_by,
      id
    );
  }

  async remove(id: number): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, string | number>(
      'delete from user_tasks where id = $1 returning *',
      id
    );
  }

  async findAll(): Promise<Array<UserTaskEntity>> {
    return await this.fetchAll<UserTaskEntity>('select * from user_tasks');
  }

  async getByUserId(id: number): Promise<Array<UserTaskEntity>> {
    return await this.fetchAll<UserTaskEntity, number>('select * from user_tasks where company_id = $1', id);
  }

  async findOneById(id: ID): Promise<UserTaskEntity> {
    return await this.fetch<UserTaskEntity, ID>(
      'select * from user_tasks where id = $1',
      id,
    );
  }
}
