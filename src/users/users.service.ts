// user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = {
      ...data,
      password: hashedPassword,
    };
    const user = this.userRepository.create(updatedUser);
    return this.userRepository.save(user);
  }

  async editUser(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}