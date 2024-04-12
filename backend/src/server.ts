import express from 'express';
import { Server } from '@overnightjs/core';
import morgan, { TokenIndexer } from 'morgan';
import cors from 'cors';
import { IncomingMessage, ServerResponse } from 'http';
import { corsOptions } from './config/cors';
import logger from 'jet-logger';
import UserController from './controller/user.controller';
import customServer from 'express-promise-router';
import mongoose from 'mongoose';
import config from './config/config';
import errorMiddleware from './middleware/error.middleware';
import AuthController from './controller/auth.controller';
import cookieParser from 'cookie-parser';

export class ServerApp extends Server {
  private readonly STARTED_MSG = 'Server APC running on port: ';

  constructor() {
    super(true);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan(this.morganJsonFormat));
    this.app.use(cors(corsOptions));
    this.app.use(cookieParser());
    this.setupControllers();

    this.app.use(errorMiddleware);

    this.initConnectionDB();
  }

  private morganJsonFormat(
    tokens: TokenIndexer,
    req: IncomingMessage,
    res: ServerResponse
  ) {
    return JSON.stringify({
      date: tokens.date(req, res, 'iso'),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      response: `${tokens['response-time'](req, res)} ms`,
      level: 'INFO',
    });
  }

  private setupControllers(): void {
    const userController = new UserController();
    const authController = new AuthController();

    super.addControllers([userController, authController], customServer);
  }

  private async initConnectionDB(): Promise<void> {
    const CONN_STR = config.db_connection_string as string;
    const db = await mongoose.connect(CONN_STR);
    console.log('Data base is connect: ' + db.connection.name);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      logger.imp(this.STARTED_MSG + port);
    });
  }
}
