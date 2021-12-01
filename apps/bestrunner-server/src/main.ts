/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import workouts from './routes/workouts';

const app = express();

// app.use(cors());
app.use(bodyparser.json());

app.use('/workouts', workouts);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to bestrunner-server!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export default app;
