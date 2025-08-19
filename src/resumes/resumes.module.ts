import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume } from './entities/resume.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
  exports: [ResumesService],
  imports: [TypeOrmModule.forFeature([Resume, User])],
})
export class ResumesModule {}
