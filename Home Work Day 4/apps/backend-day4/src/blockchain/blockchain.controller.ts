import { Controller, Get, Post } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('simple-storage')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('value')
  @ApiOperation({ summary: 'Ambil value dari smart contract' })
  async getValue() {
    return await this.blockchainService.getLatestValue();
  }

  @Post('events')
  @ApiOperation({ summary: 'Get contract events' })
  getEvents() {
    return { message: "Events query ready" };
  }
}