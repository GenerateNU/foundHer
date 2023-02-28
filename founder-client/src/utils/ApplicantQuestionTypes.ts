export type ApplicantQuestion = {
    readonly id: number;
    question_content: string;
    possible_answers: string[];
  };
  
  export type ApplicantAnswer = {
    questionId: number;
    applicantId: number;
    answers: string[];
  };
  