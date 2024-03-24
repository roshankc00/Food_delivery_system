import { Injectable } from '@nestjs/common';
import { CreateHahaDto } from './dto/create-haha.dto';
import { UpdateHahaDto } from './dto/update-haha.dto';

@Injectable()
export class HahaService {
  create(createHahaDto: CreateHahaDto) {
    return 'This action adds a new haha';
  }

  findAll() {
    return `This action returns all haha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} haha`;
  }

  update(id: number, updateHahaDto: UpdateHahaDto) {
    return `This action updates a #${id} haha`;
  }

  remove(id: number) {
    return `This action removes a #${id} haha`;
  }
}
