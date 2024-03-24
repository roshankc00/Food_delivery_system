import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';

@Entity()
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  desctiption: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  priceAfterDiscount: number;

  @ManyToOne(() => CategoryEntity, (category) => category.foods)
  category: CategoryEntity;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ default: true })
  isDeleted: boolean;
}
