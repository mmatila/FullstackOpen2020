import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, List, ListItem } from 'semantic-ui-react';
import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: { [id: string]: Diagnosis };
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <Card>
      <CardContent>
        <CardHeader content={entry.date} />
        <CardDescription content={entry.description} />
        <List bulleted>
          {entry.diagnosisCodes?.map((code, index) => (
            <ListItem key={index}>{code} {diagnoses[code].name}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;