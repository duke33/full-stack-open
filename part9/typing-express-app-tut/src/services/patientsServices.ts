import {Patient, PatientNoSsn, newPatient} from '../types';
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';


const getEntries = ():Array<Patient> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return patients;
};

const getNonSsnPatients = ():Array<PatientNoSsn> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation})=>({
     id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


const addDPatient = (
entry: newPatient

): Patient => {
 
const newPatient = 
  {
    id: uuid(),
   ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addDPatient,
  getNonSsnPatients
};