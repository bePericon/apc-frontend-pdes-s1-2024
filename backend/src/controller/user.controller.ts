import { StatusCodes } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import Logger from 'jet-logger';

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

  @Post()
  private add(req: Request, res: Response) {
    Logger.info(req.body, true);
    return res.status(StatusCodes.OK).json({
      message: 'add_called',
    });
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
