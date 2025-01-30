import { Module } from '@nestjs/common';
import { AiAnalysisService } from './ai-analysis.service';

@Module({
  imports: [],
  controllers: [],
  exports: [AiAnalysisService],
  providers: [AiAnalysisService],
})
export class AiAnalysisModule {}
