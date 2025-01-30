import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // multer 직접 import
import { AiAnalysisModule } from 'src/ai-analysis/ai-analysis.module';
import { PreprocessingModule } from 'src/preprocessing/preprocessing.module';
import { ChatFileController } from './chat_file.controller';
import { ChatFileService } from './chat_file.service';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // 올바른 메모리 저장 방식 적용
    }),
    PreprocessingModule,
    AiAnalysisModule,
  ],
  exports: [ChatFileService],
  controllers: [ChatFileController],
  providers: [ChatFileService],
})
export class ChatFileModule {}
