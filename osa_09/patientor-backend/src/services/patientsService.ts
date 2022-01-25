import { patients } from '../data/patients';
import {v1 as uuid} from 'uuid';

import { NewEntry, NewPatient, Patient } from '../types';

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

const addEntryById = (id: string, entry: NewEntry): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry = {
    ...entry,
    id: uuid(),
  }

  patient.entries.push(newEntry);
  return patient;
}

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntryById,
};