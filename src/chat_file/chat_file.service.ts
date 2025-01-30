import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { PreprocessingService } from '../preprocessing/preprocessing.service';

@Injectable()
export class ChatFileService {
  constructor(private readonly preprocessingService: PreprocessingService) {}

  async uploadFile(file: Express.Multer.File) {
    if (file.mimetype !== 'text/plain' && file.mimetype !== 'text/csv') {
      throw new BadRequestException('txt 파일만 업로드 가능합니다.');
    }
    const uploadPath = path.join(__dirname, '../../uploads', file.originalname);
    await fs.writeFile(uploadPath, file.buffer); // 파일 저장

    // 파일 전처리 실행
    const processedData =
      await this.preprocessingService.processFile(uploadPath);

    return { processedData, uploadPath };
  }

  async deleteFile(filePath: string) {
    await fs.unlink(filePath);
  }
}
