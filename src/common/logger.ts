import { console } from 'tracer';

const level =
  process.env.LOG_LEVEL === undefined ? 'info' : process.env.LOG_LEVEL;
export const logger = console({ level });
logger.info('Logger initialized with logLevel: "%s"', level);
