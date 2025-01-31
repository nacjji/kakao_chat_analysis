import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiAnalysisService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  });

  async analysisChat(chat: string[]) {
    // JSON.stringify(chat) .length가 4096을 넘어가면 그 전까지 자르기
    chat = JSON.stringify(chat).length > 4000 ? chat.slice(0, 4000) : chat;
    const content = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `다음 대화 내용을 요약해, 인물들의 MBTI와 관계를 현실적으로 분석해주세요 인물들은 두명 혹은 그 이상일 수 있습니다, 인물 : 누구, MBTI: OOOO, 이유 : OOOO, 인물 간 관계 : OOOO`,
        },
        {
          role: 'user',
          content: `${JSON.stringify(chat)}`,
        },
      ],
      model: 'gpt-4o',
    });

    return content.choices[0].message.content;
  }
}
