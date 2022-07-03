import diagnosesData from '../../data/diagnoses.json';
import {DiagnoseEntry} from '../types';

const diagnoses:Array<DiagnoseEntry> = diagnosesData;

const getEntries = ():Array<DiagnoseEntry> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};