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
  role: "Student" | "Instructor" | "Choose your role";
  password: string;
}

export interface RegisterFormProps {
  setMode: (mode: "Login" | "Register") => void; // Specify the valid mode values
}
