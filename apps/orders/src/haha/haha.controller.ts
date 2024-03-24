import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HahaService } from './haha.service';
import { CreateHahaDto } from './dto/create-haha.dto';
import { UpdateHahaDto } from './dto/update-haha.dto';

@Controller('haha')
export class HahaController {
  constructor(private readonly hahaService: HahaService) {}

  @Post()
  create(@Body() createHahaDto: CreateHahaDto) {
    return this.hahaService.create(createHahaDto);
  }

  @Get()
  findAll() {
    return this.hahaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hahaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHahaDto: UpdateHahaDto) {
    return this.hahaService.update(+id, updateHahaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hahaService.remove(+id);
  }
}
