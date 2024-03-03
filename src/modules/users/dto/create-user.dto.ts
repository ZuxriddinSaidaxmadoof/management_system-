import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "src/common/enums/enum";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({type: String})
    @IsString()
    full_name?: string;

    @ApiProperty({type: Number})
    @IsNumber()
    company_id?: number;

    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsEnum(RoleEnum)
    role: string;
  
}

