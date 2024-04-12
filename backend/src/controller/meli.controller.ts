import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import Logger from 'jet-logger';
import ApiResponse from '../class/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import axios from 'axios';
import { objectToUrlParams } from '../utils/misc';
import authMiddleware from '../middleware/auth.middleware';

@Controller('api/meli')
// @ClassMiddleware(authMiddleware)
export default class MeliController {
  @Get('search')
  private async login(req: Request, res: Response) {
    Logger.info(req.query, true);

    const access_token = req.cookies['access_token'];

    const response = await this.searchQuery(req.query, access_token);

    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse('Búsqueda finalizada', StatusCodes.OK, response));
  }

  private async searchQuery(query: any, access_token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const { data } = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?${objectToUrlParams(
        query
      )}&status=active`,
      config
    );

    return data;
  }
}
