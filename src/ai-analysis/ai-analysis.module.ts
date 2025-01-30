import { Module } from '@nestjs/common';
import { AiAnalysisController } from './ai-analysis.controller';
import { AiAnalysisService } from './ai-analysis.service';

@Module({
  imports: [],
  controllers: [AiAnalysisController],
  exports: [AiAnalysisService],
  providers: [AiAnalysisService],
})
export class AiAnalysisModule {}
