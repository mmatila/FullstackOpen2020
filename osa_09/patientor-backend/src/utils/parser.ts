import { NewPatient, Gender } from "../types";

const isGender = (gender: any): gender is Gender => Object.values(Gender).includes(gender);

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new TypeError('Incorrect or missing value' + string);
  }
  return string;
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new TypeError('Incorrect or missing value' + gender);
  }
  return gender;
}

type Fields = { 
  name: unknown, 
  dateOfBirth: unknown,
  ssn: unknown, 
  gender: unknown,
  occupation: unknown,
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  }

  return newPatient;
};

export default toNewPatient;
