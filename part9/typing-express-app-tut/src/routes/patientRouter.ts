import express from 'express';
import patientsServices from '../services/patientsServices';


const router = express.Router();

router.get('/', (_req, res) => {
 const patientList = patientsServices.getNonSsnPatients();
 res.json(patientList);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;