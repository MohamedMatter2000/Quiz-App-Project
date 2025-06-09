export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  avg_score?: number;
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
}
