export const isEmailValid = (email: string): boolean => /\S+@\S+\.\S+/.test(email)

export const isPasswordValid = (password: string): boolean => password.length >= 8
