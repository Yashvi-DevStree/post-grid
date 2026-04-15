import { Controller, Post, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from '../../common/dtos/create-client.dto';
import { ClientResponseDto } from '../../common/dtos/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  async create(@Body() dto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.createClient(dto);
  }
}