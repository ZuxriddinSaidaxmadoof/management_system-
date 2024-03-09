import { ID } from "src/common/types/type";
import { CreateUserTaskDto } from "../dto/create-user-task.dto";

export class UserTaskEntity {
    id: ID;
    user_id: number;
    task_id: number;
    start_at: Date;
    end_at: Date;
    started_date: Date | null;
    ended_date: Date | null;
    status: string;
    day: number;
    created_at: Date;
    last_updated_at: Date;
    created_by: number;
    last_updated_by: number
    constructor(dto: CreateUserTaskDto){
        this.user_id = dto.user_id;
        this.task_id = dto.task_id;
        this.start_at = dto.start_at;
        this.end_at = dto.end_at;
        this.status = dto.status;
        this.day = dto.day;
        this.last_updated_at = new Date();
        this.created_by = dto.created_by;
        this.last_updated_by = dto.last_updated_by
    }
}



