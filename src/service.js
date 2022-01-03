/* eslint-disable import/no-extraneous-dependencies */
// Requiring Modules
import express from 'express';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import debug from 'debug';
import bodyParser from 'body-parser';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Requiring project files

// load configurations
const port = config.get('app.port');
const app = express();
const corsOptions = {
  origin: config.get('client.url'),
  credentials: true,
};

// Init loggers
const httpLogger = debug('app:http-server');

// Enable body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Enable cors
app.use(cors(corsOptions));

// Using helmet to increase security
app.use(helmet());

// Using Limiter to prevent attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min is the time of our cycle
  max: 100, // Max number of requests
  delayMs: 0, // Disable delay between each request
  // Each ip will be able to make only 100 request in each 15 min with no delay between requests
});
app.use(apiLimiter); // apply to all requests

// Simple main api url response
app.get('/', (req, res) => {
  res.json({ message: 'Welcome, this is our great web scraping project.' });
});

// Calling api routes

// Running server
app.listen(port, () => httpLogger(`Server is running on port ${port}`));

// For testing import
export default app;
