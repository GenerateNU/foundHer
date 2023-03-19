export type ApplicantQuestion = {
    readonly id: number;
    question_content: string;
    possible_answers: string[];
  };
  
  export type ApplicantAnswer = {
    question_id: number;
    applicant_id: number;
    answers: string[];
  };
  