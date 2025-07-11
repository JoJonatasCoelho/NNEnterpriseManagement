import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEnterpriseDto } from './create-enterprise.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateEnterpriseDto extends PartialType(CreateEnterpriseDto) {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  id_address?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  id_contact?: number;
}
