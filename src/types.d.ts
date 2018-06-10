export interface Question {
  question: string;
  category: string;
  correctAnswer: string;
}

export interface Options {
  questionAmount: string;
  difficulty: string;
}

export interface QuestionApiResponse {
  results: [
    {
      question: string;
      correct_answer: string;
      category: string;
    }
  ];
}
