import pino from 'pino';
const loggerConfig = {
    level: 'info',
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    sync: true
                }
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
                }
            }
        ]
    }
};
const logger = pino(loggerConfig);
export default logger;
//# sourceMappingURL=logger.js.map