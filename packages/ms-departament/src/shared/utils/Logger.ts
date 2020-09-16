import pino from 'pino';

export const logger = pino({
  name: 'micro service hr',
  level: 'error',
});
