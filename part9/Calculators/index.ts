import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator';
import bodyParser from 'body-parser';
import {calculateExercises} from './exerciseCalculator';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/ping', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get("/bmi",(req, res) => {

const height=parseInt(req.query.height as string);
const weight=parseInt(req.query.weight as string);
try{
const bmi= calculateBmi(height,weight);
res.json({
  weight,
  height,
  bmi,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch(error:any){
  res.status(400).send({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error.message
  });
}});

app.post("/exerciseCalculator", (req, res) => {

 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
 const {daily_exercises, target} = req.body;
if (!daily_exercises || !target) {
 return res.status(400).send({
    error: "parameters missing"
  });}


if (!Array.isArray(daily_exercises)||isNaN(Number(target))) {
  return res.status(400).send({
    error: "malformatted parameters"
  });
}


  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const result = calculateExercises(daily_exercises, target);
return res.json(result);



});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});