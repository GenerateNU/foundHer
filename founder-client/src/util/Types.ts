export type ApplicantQuestion = {
    readonly id: number;
    question_content: string;
    possible_answers: string[];
    question_type: string;
    min_value: number;
    max_value: number;
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

  export type PropTypes = {
    question: ApplicantQuestion;
  };

  export type JobPostingPropTypes = {
    jobPosting: JobPosting;
  }

  export type JobPosting = {
    id: number,
    title: string,
    company: string,
    employer_id: number,
    description: string,
    created_at: string,
    location: string,
    experience_level: string,
    skills: string[],
    tags: string[],
    weighted_score: number | null
  }