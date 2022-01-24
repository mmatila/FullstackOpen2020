import React from 'react';
import { useParams } from 'react-router-dom';

const SinglePatientPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Single Patient Page {id}</h1>
    </div>
  );  
};

export default SinglePatientPage;
