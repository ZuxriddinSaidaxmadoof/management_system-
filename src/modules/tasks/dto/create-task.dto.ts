import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    company_id: number;

    parent_id?: number | null;

    @ApiProperty({
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    day: number;

    created_at?: Date;
    last_updated_at?: Date;

    created_by: number;
    last_updated_by: number;
}

