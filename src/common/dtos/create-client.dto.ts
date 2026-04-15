import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;
}

export class ClientResponseDto {
    id!: string;
    name!: string;
    email!: string;
    isActive!: boolean;
    createdAt!: Date;
}
