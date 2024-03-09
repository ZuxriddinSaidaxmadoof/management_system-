import { ID } from 'src/common/types/type';
import { Postgres } from 'src/lib/pg';
import { TaskEntity } from './entities/task.entity';
import { ITaskRepository } from './interfaces/task.repository';

export class TaskRepository
  extends Postgres
  implements ITaskRepository
{
  async findOneByName(name: string): Promise<TaskEntity | undefined> {
    return await this.fetch<TaskEntity, string>(
      'select * from tasks where name = $1',
      name
    );
  }


  async insert(entity: TaskEntity): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, string | number | Date >(
      'insert into tasks(title, description, company_id, parent_id, day, created_at, last_updated_at, created_by, last_updated_by ) values ($1, $2,$3,$4,$5,$6,$7,$8,$9) returning *',
      entity.title,
      entity.description,
      entity.company_id,
      entity.parent_id,
      entity.day,
      new Date(),
      new Date(),
      entity.created_by,
      entity.created_by
    );
  }


  async update(entity: TaskEntity, id: number): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, string | number | Date>(
      'update tasks set title = $1, description = $2, company_id = $3, parent_id = $4, day = $5, last_updated_at = $6, last_updated_by = $7 where id = $8 returning *',
      entity.title,
      entity.description,
      entity.company_id,
      entity.parent_id,
      entity.day,
      new Date(),
      entity.last_updated_by,
      id
    );
  }

  async remove(id: number): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, string | number>(
      'delete from tasks where id = $1 returning *',
      id
    );
  }

  async findAll(): Promise<Array<TaskEntity>> {
    return await this.fetchAll<TaskEntity>('select * from tasks');
  }

  async getByUserId(id: number): Promise<Array<TaskEntity>> {
    return await this.fetchAll<TaskEntity, number>('select * from tasks where company_id = $1', id);
  }

  async findOneById(id: ID): Promise<TaskEntity> {
    return await this.fetch<TaskEntity, ID>(
      'select * from tasks where id = $1',
      id,
    );
  }
}
