export interface QuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  _id?: string;
}
export interface QuestionFormData {
  title: string;
  description: string;
  options: QuestionOptions;
  type: "FE" | "BE" | "DO";
  answer: "A" | "B" | "C" | "D";
  difficulty: "easy" | "medium" | "hard";
}
export interface Question {
  answer: "A" | "B" | "C" | "D";
  description?: string;
  difficulty: "easy" | "medium" | "hard";
  instructor: string;
  options: QuestionOptions;
  points: number;
  status: string;
  title: string;
  type: "FE" | "BE" | "DO";
  _id: string;
}

export interface FilterConfig {
  key: string;
  type: "search" | "select";
  label: string;
  placeholder: string;
  className: string;
  filterFunction: (item: Question, value: string) => boolean;
  getUniqueValues?: (data: Question[]) => string[];
}

export interface SearchFilterConfig {
  filters: FilterConfig[];
}
