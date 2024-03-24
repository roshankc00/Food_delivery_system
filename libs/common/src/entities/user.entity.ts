import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { RoleEnum } from '../enums/role.enums';
import { OrderEntity } from './order.entiry';
import { CartEntity } from './cart.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @ManyToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
