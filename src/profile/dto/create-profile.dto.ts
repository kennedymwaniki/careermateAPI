import { AvailabilityEnum } from './../entities/profile.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExperienceDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Google Inc.',
  })
  @IsString()
  companyName: string;

  @ApiProperty({
    description: 'Job title held',
    example: 'Senior Software Engineer',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Start year of employment',
    example: 2020,
  })
  @IsNumber()
  @IsPositive()
  startYear: number;

  @ApiProperty({
    description: 'End year of employment',
    example: 2023,
  })
  @IsNumber()
  @IsPositive()
  endYear: number;

  @ApiProperty({
    description: 'Duration of employment',
    example: '3 years 2 months',
  })
  @IsString()
  duration: string;
}

export class EducationDto {
  @ApiProperty({
    description: 'Type of degree obtained',
    example: 'Bachelor',
    enum: ['Diploma', 'Bachelor', 'Master', 'PhD'],
  })
  @IsEnum(['Diploma', 'Bachelor', 'Master', 'PhD'])
  degree: 'Diploma' | 'Bachelor' | 'Master' | 'PhD';

  @ApiProperty({
    description: 'Name of the educational institution',
    example: 'University of Technology',
  })
  @IsString()
  institution: string;

  @ApiProperty({
    description: 'Start year of education',
    example: 2015,
  })
  @IsNumber()
  @IsPositive()
  startYear: number;

  @ApiProperty({
    description: 'Name of the course',
    example: 'Computer Science',
  })
  @IsString()
  coursename: string;

  @ApiProperty({
    description: 'End year of education',
    example: 2019,
  })
  @IsNumber()
  @IsPositive()
  endYear: number;
}

export class CreateProfileDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  fullname: string;

  @ApiProperty({
    description: 'The profile image of the user',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    description: 'Bio/description of the user',
    example:
      'Passionate software developer with expertise in web technologies.',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    description: 'Array of skills',
    example: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ApiProperty({
    description: 'Array of work experiences',
    type: [ExperienceDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  @IsOptional()
  experience?: ExperienceDto[];

  @ApiProperty({
    description: 'Array of educational background',
    type: [EducationDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @IsOptional()
  education?: EducationDto[];

  @ApiProperty({
    description: 'The contact information of the user',
    example: '+223988399',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'The availability status of the user',
    example: 'full_time',
    enum: AvailabilityEnum,
  })
  @IsEnum(AvailabilityEnum)
  @IsOptional()
  availability: AvailabilityEnum;

  @ApiProperty({
    description: 'The ID of the user associated with the profile',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  userId: number;
}
