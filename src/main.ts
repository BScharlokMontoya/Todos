import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? aplicar un guard de manera global forma 1
  //app.useGlobalGuards(new AuthGuard());
  //?aplicar un interceptors global forma 1 (suponer que MyInterceptors esta creado )
  //app.useGlobalInterceptors(new MyInterceptors())

  app.use(LoggerGlobal);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
