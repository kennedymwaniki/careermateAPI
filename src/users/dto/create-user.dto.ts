import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'johndoe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongpassword123',
  })
  @IsString()
  password: string;
}
