import * as dotenv from 'dotenv';



dotenv.config();



const { env = {} } = process;



// Application environemnts

export const ENVS = {

  development: 'development',

  staging: 'staging',

  production: 'production',

};



// Node environment

export const { NODE_ENV = ENVS.production } = env;



// Application port

export const PORT = Number(env.PORT) || 3001;



// Server response statuses

export const RESPONSE_STATUSES = {

  200: 200,

  204: 204,

  400: 400,

  401: 401,

  403: 403,

  404: 404,

  429: 429,

  500: 500,

};



// Server response messages

export const SERVER_MESSAGES = {

  accessDenied: 'Access denied',

  alreadyExists: 'Already exists',

  internalServerError: 'Internal server error',

  missingData: 'Missing data',

  notFound: 'Not found',

  ok: 'OK',

};

