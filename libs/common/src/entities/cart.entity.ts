import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CartItemEntity } from './CartItem.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => CartItemEntity, (cartItem) => cartItem.cart)
  cartItems: CartItemEntity;

  @OneToMany(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}