export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseNormalPart extends CourseNewPart {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseNewPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseNewPart extends CoursePartBase {
  description: string;
}

export interface CourseSpecialPart extends CourseNewPart {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
