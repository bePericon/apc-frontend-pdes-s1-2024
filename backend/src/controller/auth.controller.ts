import { Controller, Post } from '@overnightjs/core';
import Logger from 'jet-logger';
import User from '../model/userSchema';
import ApiResponse from '../class/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';

@Controller('api/auth')
export default class AuthController {
  @Post('login')
  private async login(req: Request, res: Response) {
    Logger.info(req.body, true);

    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(new ApiResponse('El usuario no existe', StatusCodes.NOT_FOUND, req.body));
    }

    //Validate password
    const result = compareSync(req.body.password, user.password);
    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new ApiResponse('Contraseña incorrecta', StatusCodes.BAD_REQUEST, null));
    }

    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse('Se ha iniciado sesión correctamente', StatusCodes.OK, user)
      );
  }
}
