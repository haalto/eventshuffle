import Fastify from 'fastify';
import { config } from './config';
const { port } = config;
const server = Fastify({});

export const runServer = async () => {
  await server.listen(port);
};
