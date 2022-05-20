import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { PORT } from './config';

import filters from './apis/filters';
import jobs from './apis/jobs';
import jobsForEmployees from './apis/jobsForEmployees';
import employeesAddress from './apis/employeesAddress';
import employeesDiagnosticCoefficient from './apis/employeesDiagnosticCoefficient';
import employeesList from './apis/employeesList';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// routing
app.use('/filters', filters);
app.use('/jobs', jobs);
app.use('/jobsForEmployees', jobsForEmployees); //created 20 complited jobs for 3 employees
app.use('/employeesAddress', employeesAddress);
app.use('/employeesDiagnosticCoefficient', employeesDiagnosticCoefficient);
app.use('/employeesList', employeesList);

// start the Express server
app.listen(PORT, () => {

  console.log(`server started at http://localhost:${PORT}`);

});
