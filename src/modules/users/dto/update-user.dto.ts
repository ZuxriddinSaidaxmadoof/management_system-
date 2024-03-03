import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "src/common/enums/enum";

export class UpdateUserDto {

    @ApiProperty({
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    login?: string;

    @ApiProperty({
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({type: String, required: false})
    @IsString()
    @IsOptional()
    full_name?: string;

    @ApiProperty({type: Number, required: false})
    @IsNumber()
    @IsOptional()
    company_id?: number;

    @ApiProperty({type: String, required: false})
    @IsOptional()
    @IsEnum(RoleEnum)
    role?: string;

}
