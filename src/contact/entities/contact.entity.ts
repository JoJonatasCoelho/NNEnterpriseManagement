import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 20 })
  telephone: string;

  @Column({ length: 20 })
  cell_phone: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.contacts, {
    onDelete: 'CASCADE',
  })
  enterprise: Enterprise;
}
