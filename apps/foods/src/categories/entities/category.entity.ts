import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FoodEntity } from '../../entities/food.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isPublished: boolean;

  @OneToMany(() => FoodEntity, (food) => food.category)
  foods: FoodEntity[];

  @Column({ default: false })
  isDeleted: boolean;
}
