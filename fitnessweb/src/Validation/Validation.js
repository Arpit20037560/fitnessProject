//email validation
export const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Enter a valid email.";
    }
    return null;
  };
//Password Validation
  export const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };
  
  export const validateLogin = ({ email, password }) => ({
    emailError: validateEmail(email),
    passwordError: validatePassword(password),
  });
  
  export const validateSignUp = ({ email, password, confirmPassword }) => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
  
    const confirmPasswordError =
      password !== confirmPassword ? "Passwords do not match." : null;
  
    return { emailError, passwordError, confirmPasswordError };
  };
  