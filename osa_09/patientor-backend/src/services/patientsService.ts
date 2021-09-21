import { patients } from '../data/patients';

import { Patient } from '../types';

const getPatients = (): Omit<Patient, 'ssn' >[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

export default {
  getPatients
};