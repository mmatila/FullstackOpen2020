export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals" | "Advanced";
  description: string;
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data"
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBase {
  name: string;
  exerciseCount: number;
  description: string;
  requirements: string[]
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
