import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    required: false,
    description: '첨부 파일',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
