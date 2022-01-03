import Fastify from 'fastify';
import { config } from './config';
import { eventRoutes } from './v1/routes/event';

const { port, host } = config;

const buildServer = () => {
  const server = Fastify({ logger: true });
  server.register(eventRoutes, { prefix: '/api/v1/event' });
  return server;
};

export const runServer = async () => {
  const server = buildServer();
  server.listen(port, host, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};
