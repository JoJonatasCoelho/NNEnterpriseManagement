import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  street: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 10 })
  cep: string;

  @Column({ length: 100 })
  district: string;

  @OneToOne(() => Enterprise, (enterprise) => enterprise.address, {
    onDelete: 'CASCADE',
  })
  enterprise: Enterprise;
}
