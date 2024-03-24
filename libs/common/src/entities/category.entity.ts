import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import { FoodEntity } from './food.entity';

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

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
