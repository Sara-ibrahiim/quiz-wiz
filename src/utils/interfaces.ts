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
  setMode: (mode: "Login" | "Register") => void; // Specify the valid mode values
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
