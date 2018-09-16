export const Validate = {
  isValidEmail: (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  },

  isValidPassword: (password: string) => {
    return password.length >= 6
  }
};