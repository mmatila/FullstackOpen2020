import React from 'react';
import { CoursePart } from "../types"
import Part from './Part';

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <>
    {parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </>
);

export default Content;
