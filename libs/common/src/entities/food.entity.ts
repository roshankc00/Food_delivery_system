import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CartEntity } from './cart.entity';

@Entity()
export class FoodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('numeric')
  price: number;

  @Column('numeric')
  discount: number;

  @Column('numeric')
  priceAfterDiscount: number;

  @Column()
  categoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.foods)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => CartEntity, (cart) => cart.foods)
  cart: CartEntity;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
