export interface Group {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}
export interface SelectOption {
  value: string;
  label: string;
}

export interface GroupFormData {
  name: string;
  students: SelectOption[];
}
