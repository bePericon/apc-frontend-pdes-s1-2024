import config from './config/config';
import { ServerApp } from './server';

const PORT = parseInt(config.port || '8080', 10);
const CONN_STR = config.db_connection_string as string;

export const server = new ServerApp();
export const app = server.getApp();

server.initConnectionDB(CONN_STR);
server.start(PORT);
