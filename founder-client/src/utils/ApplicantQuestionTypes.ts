export type ApplicantQuestion = {
    readonly id: number;
    question_content: string;
    possible_answers: string[];
    question_type: string;
    min_value: string;
    max_value: string;
    unit: string;
  };
  
  export type ApplicantAnswer = {
    question_id: number;
    applicant_id: number;
    answers: string[];
    question_type: string;
    range_answer: {[key: string]: number};
    multiple_choice_answer: string[];
    open_ended_answer: string;
    ranked_answer: {[key: string]: number};
  };
  