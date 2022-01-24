import { Patient } from '../types';
import toNewPatient from '../utils/parser';

const data = [
  {
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": "male",
    "occupation": "New york city cop",
    "entries": []
  },
  {
    "name": "Martin Riggs",
    "dateOfBirth": "1979-01-30",
    "ssn": "300179-77A",
    "gender": "male",
    "occupation": "Cop",
    "entries": []
  },
  {
    "name": "Hans Gruber",
    "dateOfBirth": "1970-04-25",
    "ssn": "250470-555L",
    "gender": "male",
    "occupation": "Technician",
    "entries": []
  },
  {
    "name": "Dana Scully",
    "dateOfBirth": "1974-01-05",
    "ssn": "050174-432N",
    "gender": "female",
    "occupation": "Forensic Pathologist",
    "entries": []
  },
  {
    "name": "Matti Luukkainen",
    "dateOfBirth": "1971-04-09",
    "ssn": "090471-8890",
    "gender": "male",
    "occupation": "Digital evangelist",
    "entries": []
  }
];

export const patients: Patient[] = data.map((obj) => {
  const patient = toNewPatient(obj) as Patient
  return patient
})