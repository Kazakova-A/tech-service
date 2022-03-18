import * as express from 'express';



import * as bodyParser from 'body-parser';



import { PORT } from './config';



import filters from './apis/filters';



const app = express();



app.use(bodyParser.json());



// routing

app.use('/filters', filters);



// start the Express server



app.listen(PORT, () => {

  console.log(`server started at http://localhost:${PORT}`);

});

