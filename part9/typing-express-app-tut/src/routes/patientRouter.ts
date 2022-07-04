/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsServices from '../services/patientsServices';


const router = express.Router();

router.get('/', (_req, res) => {
 const patientList = patientsServices.getNonSsnPatients();
 res.json(patientList);
});


router.post('/', (req, res) => {
const {  
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation }= req.body;

  const newPatientEntry = patientsServices.addDPatient({  name,
    dateOfBirth,
    ssn,
    gender,
    occupation});

    res.json(newPatientEntry);
});

export default router;