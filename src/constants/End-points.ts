 const Base_Url = "https://upskilling-egypt.com:3005/api";
// export const Base_Img_Url ="https://upskilling-egypt.com:3005/"



const Base_Auth= `${Base_Url}/auth`;

export const Auth_URls ={
    login : `${Base_Auth}/login`,
    register : `${Base_Auth}/register`,
    forgetPassword: `${Base_Auth}/forgot-password`,
    resetPassword: `${Base_Auth}/reset-password`,
    changePassword : `${Base_Auth}/change-password`,
    logout: `${Base_Auth}/logout`,
}
