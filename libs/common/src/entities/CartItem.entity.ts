import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FoodEntity } from './food.entity';
import { CartEntity } from './cart.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: string;

  @OneToOne(() => FoodEntity, (food) => food.cart)
  foods: FoodEntity;

  @OneToMany(() => CartEntity, (cart) => cart.cartItems)
  cart: CartEntity;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
