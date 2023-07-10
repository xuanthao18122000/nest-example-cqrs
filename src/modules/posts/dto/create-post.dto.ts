import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreatePostDto {
    
    user: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    status: number;
}