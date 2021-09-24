import React from 'react';
import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <p>
          {part.name} {part.description} {part.type} {part.exerciseCount}
        </p>
      );
    case 'Advanced':
      return (
        <p>
          {part.name} {part.description} {part.type} {part.exerciseCount}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          {part.name} {part.groupProjectCount} {part.type} {part.exerciseCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {part.name} {part.description} {part.type} {part.exerciseCount} {part.exerciseSubmissionLink}
        </p>
      );
    default:
      return null;
  }
}

export default Part;
