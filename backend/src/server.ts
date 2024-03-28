import express, { Application } from 'express';
import { Server } from '@overnightjs/core';
import morgan, { TokenIndexer } from 'morgan';
import cors from 'cors';
import { IncomingMessage, ServerResponse } from 'http';
import { corsOptions } from './config/cors';
import logger from 'jet-logger';
import UserController from './controller/user.controller';
import customServer from 'express-promise-router';

export class ServerApp extends Server {
  private readonly STARTED_MSG = 'Server APC running on port: ';

  constructor() {
    super(true);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan(this.morganJsonFormat));
    this.app.use(cors(corsOptions));
    this.setupControllers();

    // TODO: Adding middleware for error catch
    // this.app.use(errorMiddleware);
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
    // signupController.setDbConn(dbConnObj);

    super.addControllers(userController, customServer);
  }

  public getApp(): Application {
    return this.app;
  }

  public start(port: number) {
    this.app.listen(port, () => {
      logger.imp(this.STARTED_MSG + port);
    });
  }
}