import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { Divider } from 'semantic-ui-react';

const SinglePatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patient });
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
    </div>
  );  
};

export default SinglePatientPage;
