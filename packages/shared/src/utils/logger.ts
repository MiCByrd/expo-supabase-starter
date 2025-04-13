import { getEnvironmentConfig } from '../constants/config';

// Define log level as a union type for type safety
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Log level hierarchy for comparison
const LOG_LEVEL_HIERARCHY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Get minimum log level from environment config
const config = getEnvironmentConfig();
const MIN_LOG_LEVEL = LOG_LEVEL_HIERARCHY[config.logLevel];

// Type-safe logger implementation
export const logger = {
  debug: (message: string, ...args: unknown[]): void => {
    if (LOG_LEVEL_HIERARCHY.debug >= MIN_LOG_LEVEL) {
      console.debug(`[DEBUG][${config.env}] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]): void => {
    if (LOG_LEVEL_HIERARCHY.info >= MIN_LOG_LEVEL) {
      console.info(`[INFO][${config.env}] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]): void => {
    if (LOG_LEVEL_HIERARCHY.warn >= MIN_LOG_LEVEL) {
      console.warn(`[WARN][${config.env}] ${message}`, ...args);
    }
  },
  error: (message: string, error?: Error, ...args: unknown[]): void => {
    if (LOG_LEVEL_HIERARCHY.error >= MIN_LOG_LEVEL) {
      console.error(
        `[ERROR][${config.env}] ${message}`,
        error ? { message: error.message, stack: error.stack } : '',
        ...args
      );
    }
  },
};