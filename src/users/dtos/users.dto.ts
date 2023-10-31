import { IsNotEmpty, IsEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class User{
    id? : string;

    @IsNotEmpty()
    @ApiProperty()
    user_id: string;

    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    first_name: string;

    @ApiProperty()
    middle_name: string

    @IsNotEmpty()
    @ApiProperty()
    last_name: string;

    @IsNotEmpty()
    @ApiProperty()
    duty: string;

    @IsNotEmpty()
    @ApiProperty()
    image: string;

    @IsNotEmpty()
    @ApiProperty()
    type: string;

    @IsEmpty()
    createdDate: Date;

    @IsEmpty()
    updatedDate: Date;
}

export class UserVerification{
    
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    user_id: string
}