import patientData from '../../data/patients.json';
import {Patient, PatientNoSsn} from '../types';

const patients:Array<Patient> = patientData;

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






const addDPatient = () => {
  return null;
};

export default {
  getEntries,
  addDPatient,
  getNonSsnPatients
};