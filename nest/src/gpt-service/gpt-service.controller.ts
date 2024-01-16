import { Controller, Get, Post, Query } from '@nestjs/common';
import { GptService } from './gpt-service.service';
import { message } from './testMessage';

interface DataType {
  role: string;
  content: string;
}

@Controller('gpt-service')
export class GptServiceController {
  constructor(private readonly gptservice: GptService) {}

  @Get()
  gptMain(): string {
    return this.gptservice.gptMain();
  }

  // 파인튜닝 파일 업로드
  @Get('fine-tune')
  async uploadFineTuning(): Promise<string> {
    try {
      await this.gptservice.uploadFineTuning();
      return 'Fine-tuning 파일 업로드 완료';
    } catch (e) {
      return 'Fine-tuning 업로드 중 에러';
    }
  }

  // 파인튜닝 학습
  @Get('fine-tuning')
  async learningFinetune(): Promise<string> {
    try {
      await this.gptservice.learningFineTune();
      return 'Fine-tuning 완료';
    } catch (e) {
      return 'Fine-tuning 중 에러';
    }
  }

  // 파인튜닝 삭제
  @Get('delete-fine-tuning')
  async deleteFineTune(): Promise<string> {
    try {
      const res = await this.gptservice.deleteFineTune();
      console.log('res', res);
      return 'Fine-Tuning 삭제';
    } catch (e) {
      return 'Fine-tuning 삭제 중 에러';
    }
  }

  // 사진분석
  @Get('photo-analysis')
  async getAnswer(@Query('question') question: string): Promise<string> {
    try {
      const answer = await this.gptservice.photoAnalysis(question);
      console.log('대답대답', answer);
      return answer;
    } catch (e) {
      return `오류가 발생했습니다 ${e}`;
    }
  }

  // 글 작성
  @Get('answer')
  async testAnswer(@Query('data') data: string): Promise<DataType> {
    try {
      const answer = await this.gptservice.generateAnswer(data);

      return answer;
    } catch (e) {
      throw new Error('오류가 발생했습니다');
    }
  }

  @Post('postmessage')
  setMessage(): message {
    return this.gptservice.setMessage();
  }
}
