import { Module } from '@nestjs/common';
import { GptService } from './gpt-service.service';
import { GptServiceController } from './gpt-service.controller';

@Module({
  providers: [GptService],
  controllers: [GptServiceController],
})
export class GptServiceModule {}
