import { StatusCodes } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import Logger from 'jet-logger';
import User from '../model/userSchema';
import userMiddleware from '../middleware/user.middleware';

@Controller('api/user')
export default class UserController {
  @Get(':id')
  private get(req: Request, res: Response) {
    Logger.info(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: 'get_called',
    });
  }

  @Get('')
  private async getAll(req: Request, res: Response) {
    Logger.info(req.body, true);

    const users = await User.find({});
    return res.status(StatusCodes.OK).json({
      message: 'get_all_called',
      result: users,
    });
  }

  @Post('')
  @Middleware(userMiddleware)
  private async add(req: Request, res: Response) {
    try {
      Logger.info(req.body, true);

      const user = new User({
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

        return res.status(400).send({
          message: 'Something went wrong',
          result: {},
          error: errors,
        });
      }

      res.status(500).send({
        message: 'Something went wrong',
        result: {},
        error,
      });
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
