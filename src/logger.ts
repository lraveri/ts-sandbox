import pino, { Logger, LoggerOptions } from 'pino';
import type { PrettyOptions } from 'pino-pretty';
import type { LokiOptions } from 'pino-loki';

const loggerConfig: LoggerOptions = {
    level: 'info',
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    sync: true
                } satisfies PrettyOptions
            },
            {
                target: 'pino-loki',
                options: {
                    batching: false,
                    host: process.env.LOKI_HOST || 'https://log-1.plank.systems',
                    basicAuth: {
                        username: process.env.LOKI_USERNAME || 'admin',
                        password: process.env.LOKI_PASSWORD || 'f9u@rL2x!pQ7eDzb'
                    },
                    labels: {
                        source: process.env.LOG_SOURCE || 'E2e',
                        environment: process.env.LOG_ENV || 'local',
                        job: process.env.LOG_JOB || 'e2e-logs'
                    }
                } satisfies LokiOptions
            }
        ]
    } satisfies pino.TransportMultiOptions
};

const logger: Logger = pino(loggerConfig);

export default logger;
