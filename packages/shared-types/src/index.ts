// Basic types to get started
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface AuthError {
  code: string;
  message: string;
}
