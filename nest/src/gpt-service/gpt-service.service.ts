import { Injectable } from '@nestjs/common';
import messages, { message } from './testMessage';
// import * as OpenAI from 'openai';
import { OpenAI } from 'openai';
import * as fs from 'fs';
import * as path from 'path';

interface DataType {
  role: string;
  content: string;
}

@Injectable()
export class GptService {
  // private openai: OpenAI;
  private openai;

  constructor() {
    const apiKey = Your_API_KEY;
    this.openai = new OpenAI({ apiKey: apiKey } as any);
    // this.openai.fineTuning.jobs.create()
    // this.openai.fineTunes.create()
    // this.openai.files.list()
    // this.openai.models.del()
  }

  gptMain(): string {
    return 'gpt서비스';
  }

  // 파인튜닝 파일 업로드
  async uploadFineTuning() {
    const filePath = path.resolve(
      __dirname,
      '/Users/leejjun/projects/ai-prototype/nest/src/gpt-service/data/fine-tuning.jsonl',
    );
    try {
      const res = await this.openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: 'fine-tune',
      });
      console.log('fine-tune 파일 업로드 완료', JSON.stringify(res));
    } catch (e) {
      console.log('fine-tune 업로드 중 에러: ', e);
    }
  }

  //파인튜닝 학습
  async learningFineTune() {
    try {
      await this.openai.fineTuning.jobs.create({
        training_file: 'file-HzsOJhOqlHSw4HhKU33OVyFK',
        model: 'gpt-3.5-turbo-1106',
      });
      console.log('fine-tuneing 중');
    } catch (e) {
      console.log('fine-tuning 중 오류', e);
    }
  }

  // 파인튜닝 모델 삭제
  async deleteFineTune() {
    try {
      await this.openai.models.del('gpt-3.5-turbo-0613:personal::8cY5i9Gc');
      console.log('fine-tuning model 삭제완료');
    } catch (e) {
      console.log('fine-tuning model 삭제 중 오류', e);
    }
  }

  // 글(fine-tuning 모델)
  async generateAnswer(data: string): Promise<DataType> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'ft:gpt-3.5-turbo-1106:personal::8gxOH8vm',
        messages: JSON.parse(data),
      });

      return response.choices[0]?.message || '답을 찾을 수 없습니다.';
    } catch (e) {
      console.log('opneApi 호출 중 에러', e);
    }
  }

  // 사진 분석
  async photoAnalysis(question: string): Promise<string> {
    function toBase64(filePath) {
      const img = fs.readFileSync(filePath);
      return Buffer.from(img).toString('base64');
    }
    const base64String = toBase64(
      '/Users/leejjun/projects/ai-prototype/nest/src/gpt-service/image/pic1.png',
    );
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: question },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${base64String}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      });
      console.log('res', response.choices[0]?.message.content);
      return response.choices[0]?.message?.content || '답을 찾을 수 없습니다.';
    } catch (e) {
      console.log('OpenAi 호출 중 오류 발생:', e);
      throw e;
    }
  }

  setMessage(): message {
    try {
      return messages[0];
    } catch (e) {
      console.log('에러', e);
    }
  }

  // async generateText(
  //   prompt: string,
  //   temperature: number,
  //   topP: number,
  // ): Promise<string> {
  //   const response = await this.opneAI.create(prompt, {
  //     temperature,
  //     topP,
  //   });

  //   return response.choices[0].text;
  // }
}
