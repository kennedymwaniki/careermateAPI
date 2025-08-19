import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumesRepository: Repository<Resume>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createResumeDto: CreateResumeDto) {
    const user = await this.usersRepository.findOne({
      where: { id: createResumeDto.userId },
    });

    if (!user) {
      throw new NotFoundException('A user with that ID does not exist');
    }
    const resume = this.resumesRepository.create({
      ...createResumeDto,
      user,
    });
    return this.resumesRepository.save(resume);
  }

  findAll() {
    return this.resumesRepository.find();
  }

  findOne(id: number) {
    return this.resumesRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateResumeDto: UpdateResumeDto) {
    return this.resumesRepository.update(id, updateResumeDto);
  }

  remove(id: number) {
    return this.resumesRepository.delete(id);
  }
}
