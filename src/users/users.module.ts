import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { LoggerMiddleware } from 'src/middlewares/logger.middleware
import { UsersRepository } from './users.repository';
/* import { response } from 'express'; */
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersDbService } from './usersDB.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    UsersDbService,
    UsersRepository,
    {
      provide: 'API_USERS',
      useFactory: async () => {
        const apiUsers = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        ).then((response) => response.json());
        return apiUsers.map((user) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        });
      },
    },
  ],
  controllers: [UsersController],
})

//?forma como se implementa un middleware en modulo de manera individaul
/* export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
} */
export class UsersModule {}
