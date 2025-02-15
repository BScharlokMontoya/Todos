import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeOrmConfig from './config/typeorm';
// import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    UsersModule,
    TodosModule,
  ],
  controllers: [],
  providers: [
    //? aplicar un guard de manera global forma 2
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    //? aplicar un interceptors de manera global forma 2 (suponer que MyInterceptors esta creado )
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MyInterceptor,
    // },
  ],
})
export class AppModule {}
