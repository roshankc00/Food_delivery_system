import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { UpdateFoodDto } from './dtos/update-food.dto';
import { CreateFoodDto } from './dtos/createFood.dto';
import { GetAllFoodDto } from './dtos/get-all-food.dto';
import { CommonJwtAuthGuard, Currentuser, UserDto } from '@app/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetSingleProductService } from './dtos/getSingleFoodForOtherService.dto';

interface GetSingleaFoodInterface {
  foodId: string;
}
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}
  @Post()
  @UseGuards(CommonJwtAuthGuard)
  create(
    @Body() createFoodDto: CreateFoodDto,
    @Currentuser()
    user: UserDto,
  ) {
    return this.foodsService.create(createFoodDto);
  }

  @Get()
  findAll(@Query() getFilterData: GetAllFoodDto) {
    return this.foodsService.findAll(getFilterData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @MessagePattern('get_single_food')
  @UsePipes(new ValidationPipe())
  async getSingleFood(@Payload() data: GetSingleProductService) {
    {
      return this.foodsService.findOne(data.foodId);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
