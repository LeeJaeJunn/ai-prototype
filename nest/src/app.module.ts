import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptServiceModule } from './gpt-service/gpt-service.module';

@Module({
  imports: [GptServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
