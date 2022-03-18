import { DATABASE, ENVS, NODE_ENV } from '../config';
import db from './index';
import log from '../utilities/log';

// Drop database (DEVELOPMENT ONLY)
(async function drop(): Promise<Error | void> {
  try {
    // check the environment
    if (!(DATABASE.env === ENVS.development && NODE_ENV === ENVS.development)) {
      log('-- database: CANNOT CLEAR');
      return process.exit(0);
    }
    await db.database.sync({ force: true });
    log('-- database: CLEARED');

    return process.exit(0);
  } catch (error) {
    throw new Error(error);
  }
}());
