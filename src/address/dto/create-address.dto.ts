import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @Length(8, 10)
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  district: string;

  @ApiProperty()
  @IsString()
  @Length(2, 255)
  @IsNotEmpty()
  street: string;
}
