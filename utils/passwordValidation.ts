export const validatePassword = (password: string) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
    if (password.length < 8) {
      return "warning"; // Password is too short
    } else if (!specialCharRegex.test(password)) {
      return "warning"; // Password does not contain a special character
    } else {
      return "success"; // Password is valid
    }
  };
  
  export const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (confirmPassword !== password) {
      return "error"; // Passwords do not match
    } else {
      return validatePassword(password); // Check if password is valid
    }
  };
  