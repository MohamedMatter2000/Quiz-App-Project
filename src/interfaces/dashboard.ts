interface QuizOption {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

interface QuizQuestion {
  _id: string;
  title: string;
  options: QuizOption;
}

interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed";
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestion[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  updatedAt: string;
  createdAt: string;
  participants: number;
}
export interface QuizCardProps {
  quiz: Quiz;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: "Student" | "Instructor";
  group?: {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    students: string[];
    max_students: number;
    updatedAt: string;
    createdAt: string;
    __v: number;
  };
  avg_score?: number;
}
