import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { PORT } from './config';

import filters from './apis/filters';
import jobs from './apis/jobs';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// routing
app.use('/filters', filters);
app.use('/jobs', jobs);

// start the Express server
app.listen(PORT, () => {

  console.log(`server started at http://localhost:${PORT}`);

});

