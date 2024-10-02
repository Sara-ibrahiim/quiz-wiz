import { useEffect, useState } from "react";

interface AuthHeader {
  mode: string;
}

const AuthTitle = ({ mode }: AuthHeader) => {
  useEffect(() => {});
  return (
    <div>
      <h1 className="text-accent font-semibold">
        {mode === "Login"
          ? "Continue your learning journey with QuizWiz!"
          : "Create your account and start using QuizWiz!"}
      </h1>
    </div>
  );
};

export default AuthTitle;
