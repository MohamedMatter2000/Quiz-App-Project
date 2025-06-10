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
  schadule: string;
  duration: number;
  score_per_question: number;
  status: string;
  questions: QuizQuestion[];
  difficulty: string;
  type: string;
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
