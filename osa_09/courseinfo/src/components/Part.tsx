import React from 'react';
import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercise count: {part.exerciseCount}</p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Exercise submission link: {part.exerciseSubmissionLink}</p>
        </div>
      )
    default:
      return null;
  }
}

export default Part;
