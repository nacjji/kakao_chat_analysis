import { Module } from '@nestjs/common';
import { PreprocessingController } from './preprocessing.controller';
import { PreprocessingService } from './preprocessing.service';

@Module({
  controllers: [PreprocessingController],
  providers: [PreprocessingService],
  exports: [PreprocessingService], // 다른 모듈에서도 사용할 수 있도록 export
})
export class PreprocessingModule {}
