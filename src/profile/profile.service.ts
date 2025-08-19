import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly usersService: UsersService,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const user = await this.usersService.findOne(createProfileDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingProfile = await this.profileRepository.findOne({
      where: { user: { id: createProfileDto.userId } },
    });

    if (existingProfile) {
      throw new BadRequestException('User already has a profile');
    }
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user,
    });
    return this.profileRepository.save(profile);
  }

  async findAll() {
    return await this.profileRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return this.profileRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id: id } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.profileRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profileRepository.delete(id);
  }
}
