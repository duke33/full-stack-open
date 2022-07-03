import express from 'express';
const app = express();
import cors from 'cors';
import patientRouter from './routes/patientRouter';
import diagnosesRouter from './routes/diagnosesRouter';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(
  {
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses',diagnosesRouter);
app.use('/api/patients', patientRouter);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});