import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { PreprocessedChatDto } from './dto/preprocessed-chat.dto';

@Injectable()
export class PreprocessingService {
  async processFile(filePath: string): Promise<PreprocessedChatDto[]> {
    try {
      // 1. 파일 읽기
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // 2. 줄 단위 분할
      const lines = fileContent.split('\n');
      const chatData: PreprocessedChatDto[] = [];

      // 카카오톡 대화 포맷에 맞는 정규식: [이름] [오전/오후 시:분] 대화내용
      // 예) [나혜원] [오전 11:48] 서윤!!
      const chatLineRegex = /^\[([^]+?)\]\s*\[([^]+?)\]\s*(.*)/;

      for (const rawLine of lines) {
        const line = rawLine.trim();
        const match = line.match(chatLineRegex);

        // 매칭되는 경우에만 name, content 추출
        if (match) {
          const name = match[1].trim(); // 첫 번째 대괄호(이름)
          const contentRaw = match[3].trim(); // 세 번째 그룹(채팅 메시지)

          // 이모티콘/하트 등 특수문자를 제거하고 한글,영어,숫자,공백만 남김
          const content = this.replaceSpecialCharacters(contentRaw);

          // 필요한 형태로 chatData에 푸시
          chatData.push({
            name,
            content,
          });
        }
      }
      console.log(chatData);
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
