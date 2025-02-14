import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      name: 'Bartolomaiu',
      email: 'barto@gmail.com',
    },
    {
      id: 2,
      name: 'Arthuros',
      email: 'arthur@gmail.com',
    },
    {
      id: 3,
      name: 'Cassiopeia',
      email: 'cassie@gmail.com',
    },
    {
      id: 4,
      name: 'Dimitrios',
      email: 'dimitri@gmail.com',
    },
    {
      id: 5,
      name: 'Eleanora',
      email: 'ele@gmail.com',
    },
    {
      id: 6,
      name: 'Faustino',
      email: 'fausto@gmail.com',
    },
  ];

  async getUsers() {
    return this.users;
  }

  async getById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async getByName(name: string) {
    return this.users.find((user) => user.name === name);
  }

  async createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return { id, ...user };
  }
}
