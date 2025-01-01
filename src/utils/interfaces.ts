export interface AuthButtonProps {
  title: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  role: "Student";
  password: string;
}

export interface RegisterFormProps {
  setMode: (mode: "Login" | "Register") => void; 
}

export interface ErrorPayload {
  message: string;
}

export interface GroupsState {
  groups: Group[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  message: null | string;
}

export interface Group {
  data: any;
  name: string;
  students: [];
  _id: string;
  message?: string;
  max_students: number;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface StudentsState {
  students: Student[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  message: string | null;
}
export interface QuestionFrom {
  _id: string;
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
  };
  answer: string;
  status: string;
  instructor: string;
  difficulty: string;
  points: number;
  type: string;
}

export interface CreateQuestionFrom {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  difficulty: string;
  type: string;
}


export interface Result {
  participants: string[] | [];
  quiz: {
    closed_at: string;
    code: string;
    createdAt: string;
    description: string;
    difficulty: string;
    duration: number;
    group: string;
    instructor: string;
    questions_number: number;
    schadule: string;
    score_per_question: number;
    status: string;
    title: string;
    type: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
}

export interface GroupFromResult {
  name: string;
  students: [];
  _id: string;
  message?: string;
  max_students: number;
  instructor: string;
  status: string;
}

export interface ResultDetailsForStudent {
  finished_at: string;
  participant: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  quiz: { _id: string; title: string };
  score: number;
  started_at: string;
  _id: string;
}
export default interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  difficulty: string;
  duration: number;
  group: string;
  instructor: string;
  participants: number;
  questions_number: number;
  schadule: string;
  score_per_question: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface  OptionsForStudent  {
  [key: string]: { text: string };
}

export interface StudentQuestions{
  title:string;
  _id:string;
  options: OptionsForStudent
}