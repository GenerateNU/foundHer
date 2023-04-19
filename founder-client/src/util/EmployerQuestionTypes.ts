export type EmployerQuestion = {
  readonly id: number;
  questionContent: string;
  possibleAnswers?: string[] | undefined;
};

export type EmployerAnswer = {
  readonly id: number;
  userId: number;
  questionId: number;
  answers: string[];
};
