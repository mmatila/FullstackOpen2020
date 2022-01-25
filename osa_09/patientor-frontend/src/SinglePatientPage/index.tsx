import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import { Divider } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';

const SinglePatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
  }, [patient, id, dispatch]);

  return (
    <div>
      <h1>{patient?.name}</h1>
      <Divider hidden />
      <p>sex: {patient?.gender}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <Divider hidden />
      <h3>entries</h3>
      {patient?.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );  
};

export default SinglePatientPage;
