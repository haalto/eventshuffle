import { config } from './config';
import { runServer } from './server';
const { port } = config;
(() => {
  console.log(port);
})();
