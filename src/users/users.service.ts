import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;

    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    createUserDto.password = hashedPassword;

    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    const profile = this.profileRepository.create({ user: savedUser });
    await this.profileRepository.save(profile);

    return savedUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        profile: true,
        resumes: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
      await this.userRepository.update(id, updateUserDto).then(() => {
        return this.userRepository.findOneBy({ id });
      });
    }

    return this.userRepository.update(id, updateUserDto).then(async () => {
      const updatedUser = await this.userRepository.findOneBy({ id });
      if (!updatedUser) {
        Logger.error(`User with ID ${id} not found after update`);
        throw new NotFoundException(
          `User with ID ${id} not found after update`,
        );
      }
      return updatedUser;
    });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      Logger.error(`User with ID ${id} not found`);
      throw new BadRequestException('User not found');
    }

    return this.userRepository.delete(id);
  }

  public async findUserByEmail(email: string) {
    const User = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!User) {
      Logger.error(`User with email ${email} not found`);
      throw new BadRequestException(`A user with such an email does not exist`);
    }
    Logger.log(`User with email ${email} found`);
    return User;
  }
}
