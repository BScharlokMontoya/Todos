import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  saveUser(user: User) {
    this.userRepository.save(user);
  }
}
