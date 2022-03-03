import { NextApiRequest } from 'next';

const logger = require('pino')();

export default logger;

const logHttpRequest = (req: NextApiRequest) => {
  logger.info({
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
  });
};

export { logHttpRequest };
