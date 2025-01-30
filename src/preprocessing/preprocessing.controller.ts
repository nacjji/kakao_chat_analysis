import { Controller, Get, Query } from '@nestjs/common';
import { PreprocessingService } from './preprocessing.service';

@Controller('preprocessing')
export class PreprocessingController {
  constructor(private readonly preprocessingService: PreprocessingService) {}

  @Get('process')
  async processFile(@Query('filePath') filePath: string) {
    return this.preprocessingService.processFile(filePath);
  }
}
