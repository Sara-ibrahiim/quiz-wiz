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

export interface ErrorPayload {
  message: string;
}

export interface GroupsState {
  groups: Group[]
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  message: null | string
}

export interface Group {
  name: string;
  students: [];
  _id: string;
  message?: string;
  max_students: number
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface StudentsState {
  students: Student[]
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  message: string | null
}