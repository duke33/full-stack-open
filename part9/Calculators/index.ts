import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator';
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/ping', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get("/bmi",(req, res) => {


const height=parseInt(req.query.height as string);
const weight=parseInt(req.query.weight as string);
try{
const bmi= calculateBmi(height,weight)
res.json({
  weight,
  height,
  bmi,
});
}catch(error:any){
  res.status(400).send({
    error: error.message
  });
}})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});