interface Answer {
  id: number;
  answer: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  question: string;
  question_answer: Answer[];
}

interface RandomCategory {
  random_question: Question;
}

export interface RandomCategoryResponse {
  random_category: RandomCategory;
}
