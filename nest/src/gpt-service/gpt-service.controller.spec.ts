import { Test, TestingModule } from '@nestjs/testing';
import { GptServiceController } from './gpt-service.controller';

describe('GptServiceController', () => {
  let controller: GptServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GptServiceController],
    }).compile();

    controller = module.get<GptServiceController>(GptServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
