import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from 'src/enterprise/dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterprisesServices: EnterpriseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new enterprise' })
  @ApiResponse({
    status: 201,
    description: 'The enterprise has been successfully created.',
    type: Enterprise,
  })
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterprisesServices.create(createEnterpriseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all enterprises' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of enterprises.',
    type: [Enterprise],
  })
  findAll(): Promise<Enterprise[]> {
    return this.enterprisesServices.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an enterprise by ID' })
  @ApiResponse({
    status: 204,
    description: 'The enterprise has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Enterprise not found.',
  })
  remove(@Param('id') id: string) {
    return this.enterprisesServices.remove(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single enterprise by ID' })
  @ApiResponse({
    status: 200,
    description: 'The enterprise data.',
    type: Enterprise,
  })
  @ApiResponse({
    status: 404,
    description: 'Enterprise not found.',
  })
  findOne(@Param('id') id: number): Promise<Enterprise> {
    return this.enterprisesServices.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an enterprise by ID' })
  @ApiResponse({
    status: 200,
    description: 'The enterprise has been successfully updated.',
    type: Enterprise,
  })
  @ApiResponse({
    status: 404,
    description: 'Enterprise not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  update(
    @Param('id') id: number,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<Enterprise> {
    return this.enterprisesServices.update(id, updateEnterpriseDto);
  }
}
