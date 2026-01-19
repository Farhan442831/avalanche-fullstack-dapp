import { Controller, Get } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('value')
  @ApiOperation({ summary: 'Get current value from blockchain' })
  @ApiResponse({ status: 200, description: 'Return value successfully' })
  async getValue() {
    // Pastikan memanggil getValue(), bukan getLatestValue()
    return await this.blockchainService.getValue();
  }
}