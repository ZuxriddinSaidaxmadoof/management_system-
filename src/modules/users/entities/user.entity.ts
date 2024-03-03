import { ID } from "src/common/types/type";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserEntity {
    login: string;
    password: string;
    full_name: string;
    company_id: number | null;
    role: string;
    created_at: Date;
    created_by: number
    last_updated_at: Date;
    last_updated_by: number | null;
    id: ID

    constructor(dto: CreateUserDto){
        this.login = dto.login;
        this.password = dto.password;
        this.full_name = dto.full_name;
        this.company_id = dto.company_id || null;
        this.role = dto.role || "worker";
        this.created_by = null;
        this.last_updated_at = new Date();
        this.last_updated_by = null;
    }
}

