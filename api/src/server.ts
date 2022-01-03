import { app } from './app';
import { config } from './config';

const { port, host } = config;
(async () => {
  const server = app();
  server.listen(port, host, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
})();
