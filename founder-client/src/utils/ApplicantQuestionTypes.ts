export type ApplicantQuestion = {
    readonly id: number;
    questionContent: string;
    possibleAnswers?: string[] | undefined;
  };
  
  export type ApplicantAnswer = {
    readonly id: number;
    questionId: number;
    applicantId: number;
    answers: string[];
  };
  