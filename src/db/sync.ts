import createDatabase from './create-database';
import db from './index';
import seeding from './seeding';
import { DATABASE } from '../config';
import log from '../utilities/log';

// Run database synchronization
(async function sync(): Promise<Error|void> {
  try {
    // create database if necessary
    await createDatabase(DATABASE.database);

    // sync the database if necessary
    try {
      await db.Employees.findOne({
        where: {
          isDeleted: false,
        },
      });
    } catch (error) {
      const { message = '', name = '' } = error;

      if (message && message === 'relation "Employees" does not exist'
        && name && name === 'SequelizeDatabaseError') {
        await db.database.sync({ force: true });
        log('-- database: syncing is done');
      } else {
        throw new Error(error);
      }
    }

      // run database seeding
      await seeding(db, DATABASE.seeding);

    log('-- database: ready');
    return process.exit(0);
  } catch (error) {
    throw new Error(error);
  }
}());
