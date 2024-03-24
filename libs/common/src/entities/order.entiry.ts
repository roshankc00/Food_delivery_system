import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  JoinColumn,
} from 'typeorm';
import { paymentMethod } from '../enums';
import { UserEntity } from './user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  userId: string;

  @OneToMany(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  phoneNumber: string;

  @Column({ default: 'nepal' })
  country: string;

  @Column({ default: false })
  paymentStatus: boolean;

  @Column({ type: 'enum', enum: paymentMethod })
  paymentMethod: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
