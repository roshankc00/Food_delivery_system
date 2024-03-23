import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../enums/role.enums';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ default: true })
  isActive: boolean;
}
