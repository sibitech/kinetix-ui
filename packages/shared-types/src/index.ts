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

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date
  email: string;
  phone?: string;
  address?: string;
  createdAt?: string; // ISO datetime
  updatedAt?: string; // ISO datetime
}

export interface PatientList {
  patients: Patient[];
  total: number;
  page: number;
  pageSize: number;
}
