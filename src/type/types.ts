export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionState extends TriviaQuestion {
  answers: string[];
}

export interface APIResponse {
  response_code: number;
  results: TriviaQuestion[];
}
