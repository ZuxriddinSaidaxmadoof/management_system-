import { ID } from "src/common/types/type";
import { CreateTaskDto } from "../dto/create-task.dto";

export class TaskEntity {
    id: ID;
    title: string;
    description: string;
    company_id: number;
    parent_id: number | null;
    day: number;
    created_at: Date;
    last_updated_at: Date;
    created_by: number;
    last_updated_by: number;
    constructor(dto: CreateTaskDto){
        this.title = dto.title;
        this.description = dto.description;
        this.company_id = dto.company_id;
        this.parent_id = dto.parent_id || null;
        this.day = dto.day;
        this.last_updated_at = new Date();
        this.created_by = dto.created_by;
        this.last_updated_by = dto.last_updated_by;
    }
}


