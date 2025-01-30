import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { AiAnalysisService } from 'src/ai-analysis/ai-analysis.service';
import { ChatFileService } from './chat_file.service';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('chat-file')
export class ChatFileController {
  constructor(
    private readonly chatFileService: ChatFileService,
    private readonly aiAnalysisService: AiAnalysisService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  async create(
    @Body() dto: FileUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploadResult = await this.chatFileService.uploadFile(file);
    const chat = await this.aiAnalysisService.analysisChat(
      uploadResult.processedData,
    );
    await this.chatFileService.deleteFile(uploadResult.uploadPath);
    return chat;
  }
}
