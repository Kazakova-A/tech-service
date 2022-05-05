import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { PORT } from './config';

import filters from './apis/filters';
import jobs from './apis/jobs';
import jobsForEmployees from './apis/jobsForEmployees';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// routing
app.use('/filters', filters);
app.use('/jobs', jobs);
app.use('/jobsForEmployees', jobsForEmployees);//created 20 complited jobs for 3 employees

// start the Express server
app.listen(PORT, () => {

  console.log(`server started at http://localhost:${PORT}`);

});
