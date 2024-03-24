import { Test, TestingModule } from '@nestjs/testing';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

describe('FoodsController', () => {
  let foodsController: FoodsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FoodsController],
      providers: [FoodsService],
    }).compile();

    foodsController = app.get<FoodsController>(FoodsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(foodsController.getHello()).toBe('Hello World!');
    });
  });
});
