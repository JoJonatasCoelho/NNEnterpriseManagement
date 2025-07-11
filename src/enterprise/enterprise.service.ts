import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEnterpriseDto } from 'src/enterprise/dto/create-enterprise.dto';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { Repository } from 'typeorm';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { ContactService } from 'src/contact/contact.service';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
    private readonly contactService: ContactService,
    private readonly addressService: AddressService,
  ) {}
  async remove(id: number) {
    try {
      const enterprise = await this.enterpriseRepository.findOne({
        where: { id },
        relations: ['contacts', 'address'],
      });
      if (!enterprise) {
        throw new NotFoundException(`Enterprise with ID ${id} not found`);
      }
      await this.addressService.remove(enterprise.address.id);
      await this.enterpriseRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error removing enterprise with ID ${id}: ${error.message}`,
      );
    }
    return { message: `Enterprise ${id} deleted successfully` };
  }

  async findAll() {
    try {
      return await this.enterpriseRepository.find({
        relations: ['contacts', 'address'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving enterprises: ${error.message}`,
      );
    }
  }

  async create(createEnterpriseDto: CreateEnterpriseDto) {
    try {
      const { contact, ...enterpriseData } = createEnterpriseDto;

      const enterprise = this.enterpriseRepository.create(enterpriseData);

      if (!enterprise.contacts) {
        enterprise.contacts = [];
      }

      const newContact = await this.contactService.create(contact);
      enterprise.contacts.push(newContact);

      return await this.enterpriseRepository.save(enterprise);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating enterprise: ${error.message}`,
      );
    }
  }

  async update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    const { contact, address, ...enterpriseData } = updateEnterpriseDto;

    const enterpriseExists = await this.findOne(id);

    if (!enterpriseExists)
      throw new NotFoundException(`Enterprise with ID ${id} not found`);

    await this.addressService.update(enterpriseData.id_address, address);

    await this.contactService.update(enterpriseData.id_contact, contact);

    await this.enterpriseRepository.update(id, enterpriseData);
    return this.findOne(id);
  }

  findOne(id: number) {
    return this.enterpriseRepository.findOneBy({ id });
  }
}
