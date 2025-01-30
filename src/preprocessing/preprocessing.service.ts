import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class PreprocessingService {
  async processFile(filePath: string): Promise<string[]> {
    try {
      // 1. 파일 읽기
      const fileContent = await fs.readFile(filePath, 'utf-8');
      console.log(fileContent);
      // 2. 줄 단위 분할
      const lines = fileContent.split('\n');
      const chatData: string[] = [];

      // 카카오톡 대화 포맷에 맞는 정규식: [이름] [오전/오후 시:분] 대화내용
      // 예) [나혜원] [오전 11:48] 서윤!!

      for (const rawLine of lines) {
        const line = rawLine.trim();
        chatData.push(line);
      }

      return chatData;
    } catch (error) {
      console.error('파일 처리 중 오류 발생:', error);
      throw error;
    }
  }

  /**
   * ✅ 하트, 이모티콘 등 특수문자 제거
   *    한글, 영어, 숫자, 공백만 허용
   */
  private replaceSpecialCharacters(text: string): string {
    return text.replace(/[^가-힣a-zA-Z0-9\s]/g, '');
  }
}
