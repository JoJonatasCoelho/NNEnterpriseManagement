import { Address } from 'src/address/entities/address.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20, unique: true })
  cnpj: string;

  @Column({ length: 255 })
  company: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('decimal')
  margin: number;

  @OneToMany(() => Contact, (contact) => contact.enterprise, { cascade: true })
  @JoinColumn({ name: 'id_contact' })
  contacts: Contact[];

  @ManyToOne(() => Address, (address) => address.enterprise, {
    cascade: true,
  })
  @JoinColumn({ name: 'id_address' })
  address: Address;
}
