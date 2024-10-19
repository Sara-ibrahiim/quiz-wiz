export const Base_Url = "https://upskilling-egypt.com:3005/api";
// export const Base_Img_Url ="https://upskilling-egypt.com:3005/"

const Base_Auth = `${Base_Url}/auth`;

export const Auth_URls = {
  login: `${Base_Auth}/login`,
  register: `${Base_Auth}/register`,
  forgetPassword: `${Base_Auth}/forgot-password`,
  resetPassword: `${Base_Auth}/reset-password`,
  changePassword: `${Base_Auth}/change-password`,
  logout: `${Base_Auth}/logout`,
};

const Base_Ques = `${Base_Url}/question`;
export const Question_URls = {
  getAll: `${Base_Ques}`,
  create: `${Base_Ques}`,
  delete: (id: string) => `${Base_Ques}/${id}`,
  update: (id: string) => `${Base_Ques}/${id}`,
};

const Base_Groups = `${Base_Url}/group`;
export const Groups_URls = {
  getGroupsList: `${Base_Groups}`,
  addGroup: `${Base_Groups}`,
  updateGroup: (id: string): string => `${Base_Groups}/${id}`,
  deleteGroup: (id: string): string => `${Base_Groups}/${id}`,
  getGroupByID: (id: string): string => `${Base_Groups}/${id}`,
};

const Base_Students = `${Base_Url}/student`;
export const Students_URls = {
  getStudentsList: `${Base_Students}`,
  topStudents: `${Base_Students}/top-five`,
  studentsGetById: (id: string): string => `${Base_Students}/${id}`,
};

const Base_Quizes = `${Base_Url}/quiz`;

export const QUIZES_URLS = {
  getAllQuizes: `${Base_Quizes}`, // GET
  createNewQuiz: `${Base_Quizes}`, // POST
  getIncoming5Quizes: `${Base_Quizes}/incomming`, // GET
  getLast5Quizes: `${Base_Quizes}/completed`, // GET
  deleteQuizByID: (id: string) => `${Base_Quizes}/${id}`, // DEL
  getQuizById: (id: string) => `${Base_Quizes}/${id}`, //GET
  updateQuizById: (id: string) => `${Base_Quizes}/${id}`, //PUT
  reasignQuizGroupById: (id: string) => `${Base_Quizes}/reassign/${id}`, //POST
};

const Base_Results = `${Base_Url}/quiz/result`;
export const Results_URls = {
  getAllResults: `${Base_Results}`,
};

const Base_Results = `${Base_Url}/quiz/result`;
export const Results_URls = {
  getAllResults: `${Base_Results}`,
};
