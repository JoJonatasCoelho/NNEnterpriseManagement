console.log('Directory:', __dirname);

import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseService } from './enterprise.service';
import { ContactService } from 'src/contact/contact.service';
import { AddressService } from 'src/address/address.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Contact } from 'src/contact/entities/contact.entity';

describe('EnterpriseService', () => {
  let service: EnterpriseService;
  let enterpriseRepository: Repository<Enterprise>;
  let contactService: ContactService;
  let addressService: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnterpriseService,
        {
          provide: getRepositoryToken(Enterprise),
          useClass: Repository,
        },
        {
          provide: ContactService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: AddressService,
          useValue: {
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EnterpriseService>(EnterpriseService);
    enterpriseRepository = module.get<Repository<Enterprise>>(
      getRepositoryToken(Enterprise),
    );
    contactService = module.get<ContactService>(ContactService);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    it('should delete an enterprise and its address', async () => {
      const enterpriseMock = { id: 1, address: { id: 2 } };

      jest
        .spyOn(enterpriseRepository, 'findOne')
        .mockResolvedValue(enterpriseMock as Enterprise);
      jest.spyOn(addressService, 'remove').mockResolvedValue(undefined);
      jest.spyOn(enterpriseRepository, 'delete').mockResolvedValue(undefined);

      const result = await service.remove(1);

      expect(enterpriseRepository.findOne).toHaveBeenCalledWith(1);
      expect(addressService.remove).toHaveBeenCalledWith(2);
      expect(enterpriseRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: `Enterprise 1 deleted successfully` });
    });
  });

  describe('findAll', () => {
    it('should return all enterprises with relations', async () => {
      const enterprisesMock = [{ id: 1 }, { id: 2 }];
      jest
        .spyOn(enterpriseRepository, 'find')
        .mockResolvedValue(enterprisesMock as Enterprise[]);

      const result = await service.findAll();

      expect(enterpriseRepository.find).toHaveBeenCalledWith({
        relations: ['contacts', 'address'],
      });
      expect(result).toEqual(enterprisesMock);
    });
  });

  describe('create', () => {
    it('should create an enterprise with a contact', async () => {
      const createEnterpriseDto: CreateEnterpriseDto = {
        name: 'Test Enterprise',
        cnpj: '12345678000195',
        company: 'Test Company',
        margin: 20,
        address: {
          street: 'Test Street',
          city: 'Test City',
          state: 'TS',
          cep: '12345-678',
          district: 'Test District',
        },
        contact: {
          email: 'test@example.com',
          telephone: '123456789',
          cell_phone: '987654321',
        },
      };

      // Mock enterprise with all required fields
      const enterpriseMock: Enterprise = {
        id: 1,
        name: 'Test Enterprise',
        cnpj: '12345678000195',
        company: 'Test Company',
        margin: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
        address: {
          id: 1,
          street: 'Test Street',
          city: 'Test City',
          state: 'TS',
          cep: '12345-678',
          district: 'Test District',
          enterprise: null, // Or a reference to the `enterpriseMock` itself
        },
        contacts: [],
      };

      const contactMock: Contact = {
        id: 1,
        email: 'test@example.com',
        telephone: '123456789',
        cell_phone: '987654321',
        enterprise: enterpriseMock, // Associate the contact with the enterprise
      };

      // Mock repository and service methods
      jest
        .spyOn(enterpriseRepository, 'create')
        .mockReturnValue(enterpriseMock as Enterprise);

      jest.spyOn(contactService, 'create').mockResolvedValue(contactMock);

      jest
        .spyOn(enterpriseRepository, 'save')
        .mockResolvedValue({ ...enterpriseMock, contacts: [contactMock] });

      // Call the service
      const result = await service.create(createEnterpriseDto);

      // Assertions
      expect(result).toEqual({
        ...enterpriseMock,
        contacts: [contactMock],
      });
      expect(enterpriseRepository.create).toHaveBeenCalledWith(
        createEnterpriseDto,
      );
      expect(contactService.create).toHaveBeenCalledWith(
        createEnterpriseDto.contact,
      );
      expect(enterpriseRepository.save).toHaveBeenCalledWith({
        ...enterpriseMock,
        contacts: [contactMock],
      });
    });
  });

  describe('update', () => {
    it('should update an enterprise, its contact, and its address', async () => {
      const updateEnterpriseDto: UpdateEnterpriseDto = {
        id_address: 2,
        id_contact: 3,
        name: 'Updated Enterprise',
      };

      jest.spyOn(addressService, 'update').mockResolvedValue(undefined);
      jest.spyOn(contactService, 'update').mockResolvedValue(undefined);
      jest.spyOn(enterpriseRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(service, 'findOne').mockResolvedValue({ id: 1 } as Enterprise);

      const result = await service.update(1, updateEnterpriseDto);

      expect(addressService.update).toHaveBeenCalledWith(
        2,
        updateEnterpriseDto.address,
      );
      expect(contactService.update).toHaveBeenCalledWith(
        3,
        updateEnterpriseDto.contact,
      );
      expect(enterpriseRepository.update).toHaveBeenCalledWith(1, {
        name: 'Updated Enterprise',
      });
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('findOne', () => {
    it('should return a single enterprise by ID', async () => {
      const enterpriseMock = { id: 1 };
      jest
        .spyOn(enterpriseRepository, 'findOneBy')
        .mockResolvedValue(enterpriseMock as Enterprise);

      const result = await service.findOne(1);

      expect(enterpriseRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(enterpriseMock);
    });
  });
});
