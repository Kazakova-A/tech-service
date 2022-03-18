import { exec } from 'child_process';
import { promisify } from 'util';

import log from '../utilities/log';

const execPromise = promisify(exec);

export default async (name: string = ''): Promise<Error | void> => {
  const {
    stderr: checkError = '',
    stdout = '',
  } = await execPromise(`psql -l | grep ${name} | wc -l`);
  // if (checkError) {
  //   throw new Error(checkError);
  // }

  // create the database
  if (!stdout || stdout.trim() === '0') {
    const { stderr: createError = '' } = await execPromise(`createdb ${name}`);
    if (createError) {
      throw new Error(createError);
    }
    return log('-- database: created database');
  }
  return log('-- database: database already exists');
};
