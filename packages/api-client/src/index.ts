import type { Patient, PatientList } from '@kinetix/shared-types';

const API_BASE = '/api/patients';

export async function fetchPatients(page = 1, pageSize = 10): Promise<PatientList> {
  const res = await fetch(`${API_BASE}?page=${page}&pageSize=${pageSize}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch patients');
  return res.json();
}

export async function fetchPatient(id: string): Promise<Patient> {
  const res = await fetch(`${API_BASE}/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch patient');
  return res.json();
}

export async function createPatient(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(patient),
  });
  if (!res.ok) throw new Error('Failed to create patient');
  return res.json();
}

export async function updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(patient),
  });
  if (!res.ok) throw new Error('Failed to update patient');
  return res.json();
}

export async function deletePatient(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete patient');
}
