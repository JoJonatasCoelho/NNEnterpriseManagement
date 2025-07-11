import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({example: 'John Doe'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(10, 20)
  @IsNotEmpty()
  telephone: string;

  @ApiProperty()
  @IsString()
  @Length(10, 20)
  @IsNotEmpty()
  cell_phone: string;
}
