import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from '../enums/role.enums';

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

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
