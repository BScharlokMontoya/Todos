import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { User } from './user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';

@Controller('users') //* Esto define la ruta osea http://localhost:3000/users
@UseGuards(AuthGuard) //? forma de hacer un guard para todos los endpoint de la clase (por controlador)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersService.getUserByName(name);
    }
    return this.usersService.getUsers();
  }

  @Get('profile')
  getUserProfile(@Headers('token') token?: string) {
    if (token !== '1234') {
      return 'Sin acceso';
    }
    return 'Este endpoint retorna el perfil del usuario ';
  }

  @Get('profile/images') // nuevo endpoint o ruta de tipo get
  @UseGuards(AuthGuard) //? forma de hacer un guard para un endpoint especifico
  getUserProfileImage() {
    return 'Este endpoint retorna las imagenes del usuario del usuario ';
  }

  @HttpCode(418) // para asiganrle el status
  @Get('coffee')
  getCoffee() {
    return 'No se hacer cafe, soy una tetera';
  }

  @Get('message')
  getMessage(@Res() response: Response) {
    response.status(200).send('Este es un mensaje');
  }

  @Get('request')
  getRequest(@Req() request: Request) {
    return 'esta ruta loguea el request';
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUsersById(Number(id));
  }

  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(@Body() user: User, @Req() request: Request & { now: string }) {
    console.log('dentro del endpoint:', request.now);

    return this.usersService.createUser(user);
  }
  @Put()
  updateUser() {
    return ' Este endpoint Actualiza un usuario en la base de datos';
  }

  @Delete()
  deleteUser() {
    return ' Este endpoint elimina un usuario en la base de datos';
  }
}
