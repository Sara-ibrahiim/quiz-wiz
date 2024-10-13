export const EmailValidation ={
    required:"Email Is Required",
    pattern:{
      value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message:"Enter a valid e-mail address"

    },
}
const PasswordRegEx= 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const PasswordValidation={
required:"Password Is Required",
pattern:{
  value:PasswordRegEx,
  message:"You have entered an invalid password"

},

}