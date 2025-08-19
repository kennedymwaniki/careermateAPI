import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateResumeDto {
  @ApiProperty({
    description: 'The file path of the resume',
    type: String,
  })
  @IsString()
  filepath: string;

  @ApiProperty({
    description: 'The file URL of the resume',
    type: String,
  })
  @IsString()
  fileurl: string;

  @ApiProperty({
    description: 'The ID of the user who owns the resume',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  userId: number;
}
