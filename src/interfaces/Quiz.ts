export interface QuizQuestion {
  _id: string;
  title: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface Quiz {
  _id: string;
  title: string;
  code: string;
  description: string;
  schedule: string;
  duration: number;
  score_per_question: number;
  status: string;
  questions: QuizQuestion[];
}

export interface GroupOption {
  value: string;
  name: string;
}

//   export interface User {
//     role: 'Instructor' | 'Student';
//   }

//   export interface RootState {
//     auth: {
//       user: User;
//     };
//   }
