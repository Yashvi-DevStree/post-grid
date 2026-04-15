import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Client } from '../../database/entities/client.entity';
import { CreateClientDto } from '../../common/dtos/create-client.dto';
import { ClientResponseDto } from '../../common/dtos/create-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
    ) { }

    async createClient(dto: CreateClientDto): Promise<ClientResponseDto> {
        // Check if client already exists
        const existingClient = await this.clientRepository.findOne({
            where: { email: dto.email },
        });

        if (existingClient) {
            throw new ConflictException('Client with this email already exists');
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);

        const client = this.clientRepository.create({
            name: dto.name,
            email: dto.email,
            password_hash: passwordHash,
            is_active: true,
        });

        const savedClient = await this.clientRepository.save(client);

        return {
            id: savedClient.id,
            name: savedClient.name,
            email: savedClient.email,
            isActive: savedClient.is_active,
            createdAt: savedClient.created_at,
        };
    }
}