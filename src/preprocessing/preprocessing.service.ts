import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { PreprocessedChatDto } from './dto/preprocessed-chat.dto';

@Injectable()
export class PreprocessingService {
  async processFile(filePath: string): Promise<PreprocessedChatDto[]> {
    try {
      // 1. 파일 읽기
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // 2. 정규 표현식 (카카오톡 메시지 포맷 수정)
      const messagePattern =
        /^\d{4}년 \d{1,2}월 \d{1,2}일 (오전|오후) \d{1,2}:\d{2},\s*(.+?)\s*:\s*(.+)$/;

      const lines = fileContent.split('\n'); // 줄 단위 분할
      const chatData: PreprocessedChatDto[] = [];

      lines.forEach((line) => {
        line = line.trim(); // 앞뒤 공백 제거
        const match = line.match(messagePattern);

        if (match) {
          const [, , rawSender, rawMessage] = match;

          // ✅ 특수문자 제거
          const sender = this.replaceSpecialCharacters(rawSender);
          const message = this.replaceSpecialCharacters(rawMessage);

          if (message) {
            chatData.push({ name: sender, content: message });
          }
        }
      });

      return chatData;
    } catch (error) {
      console.error('파일 처리 중 오류 발생:', error);
      throw error;
    }
  }

  /**
   * ✅ 하트, 이모티콘 등 특수문자 제거
   * - 한글, 영어, 숫자, 공백만 허용
   */
  private replaceSpecialCharacters(text: string): string {
    return text.replace(/[^가-힣a-zA-Z0-9\s]/g, '');
  }
}
