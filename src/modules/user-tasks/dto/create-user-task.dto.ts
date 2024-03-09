import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StatusEnum } from "src/common/enums/enum";

export class CreateUserTaskDto {
    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    task_id: number;

    @ApiProperty({
        type: Date
    })
    @IsDate()
    @IsNotEmpty()
    start_at: Date;

    @ApiProperty({
        type: Date
    })
    @IsDate()
    @IsNotEmpty()
    end_at: Date;

    @ApiProperty({
        type: String,
        default: StatusEnum.PROCESS
    })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    day: number;

    started_date: Date | null;
    ended_date: Date | null;
    created_at: Date;
    last_updated_at: Date;
    created_by: number;
    last_updated_by: number
}
