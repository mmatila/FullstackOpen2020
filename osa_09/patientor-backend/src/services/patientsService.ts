import { patients } from '../data/patients';
import {v1 as uuid} from 'uuid';

import { NewPatient, Patient } from '../types';

const getPatients = (): Omit<Patient, 'ssn' >[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  }

  patients.push(newPatient);
  return newPatient;
}

export default {
  getPatients,
  addPatient,
  getPatientById
};