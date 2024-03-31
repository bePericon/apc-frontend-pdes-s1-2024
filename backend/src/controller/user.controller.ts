import { StatusCodes } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import Logger from 'jet-logger';
import { User } from '../model/userSchema';

@Controller('api/users')
export default class UserController {
  @Get(':id')
  private get(req: Request, res: Response) {
    Logger.info(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: 'get_called',
    });
  }

  @Get('')
  private getAll(req: Request, res: Response) {
    Logger.info(req.body, true);
    return res.status(StatusCodes.OK).json({
      message: 'get_all_called',
    });
  }

  @Post('')
  // @Middleware()
  private async add(req: Request, res: Response) {
    Logger.info(req.body, true);

    try {
      const user = User.build({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();

      return res.status(StatusCodes.OK).json({
        message: 'add_called',
        result: user,
      });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        let errors: any = {};

        Object.keys(error.errors).forEach((key: any) => {
          errors[key] = error.errors[key].message;
        });

        return res.status(400).send(errors);
      }
      res.status(500).send('Something went wrong');
    }
  }

  @Put('update-user')
  private update(req: Request, res: Response) {
    Logger.info(req.body);
    return res.status(StatusCodes.OK).json({
      message: 'update_called',
    });
  }

  @Delete('delete/:id')
  private delete(req: Request, res: Response) {
    Logger.info(req.params, true);
    return res.status(StatusCodes.OK).json({
      message: 'delete_called',
    });
  }
}
