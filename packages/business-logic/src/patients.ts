// Business logic for patient management
import type { IncomingMessage, ServerResponse } from 'http';
import { Patient, PatientList } from '@kinetix/shared-types';
import { getPatientsCollection } from './db';

// Define minimal types for Vercel serverless handlers
export type VercelRequest = IncomingMessage & {
  body?: any;
  query?: { [key: string]: string | string[] };
  headers: { [key: string]: string | string[] | undefined };
  method?: string;
};
export type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
  end: (body?: any) => void;
  headersSent?: boolean;
};

// Helper to parse pagination params
function parsePagination(query: any) {
  const page = Math.max(1, parseInt(query?.page as string) || 1);
  const pageSize = Math.max(1, Math.min(100, parseInt(query?.pageSize as string) || 10));
  return { page, pageSize };
}

// Placeholder handlers for now
export async function getPatientsHandler(req: VercelRequest, res: VercelResponse) {
  const { page, pageSize } = parsePagination(req.query);
  const col = await getPatientsCollection();
  const total = await col.countDocuments();
  const docs = await col
    .find({}, { projection: { _id: 0 } })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  const patients: Patient[] = docs.map((doc: any) => ({
    id: doc.id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    dateOfBirth: doc.dateOfBirth,
    email: doc.email,
    phone: doc.phone,
    address: doc.address,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
  res.status(200).json({ patients, total, page, pageSize } as PatientList);
}

export async function createPatientHandler(req: VercelRequest, res: VercelResponse) {
  const col = await getPatientsCollection();
  const patient: Patient = {
    ...req.body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await col.insertOne(patient);
  res.status(201).json(patient);
}

export async function getPatientByIdHandler(req: VercelRequest, res: VercelResponse) {
  const col = await getPatientsCollection();
  const id = req.query?.id as string;
  const patient = await col.findOne({ id }, { projection: { _id: 0 } });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.status(200).json(patient);
}

export async function updatePatientHandler(req: VercelRequest, res: VercelResponse) {
  const col = await getPatientsCollection();
  const id = req.query?.id as string;
  const update = { ...req.body, updatedAt: new Date().toISOString() };
  const result = await col.findOneAndUpdate(
    { id },
    { $set: update },
    { returnDocument: 'after', projection: { _id: 0 } }
  );
  if (!result || !result.value) return res.status(404).json({ error: 'Patient not found' });
  res.status(200).json(result.value);
}

export async function deletePatientHandler(req: VercelRequest, res: VercelResponse) {
  const col = await getPatientsCollection();
  const id = req.query?.id as string;
  const result = await col.deleteOne({ id });
  if (result.deletedCount === 0) return res.status(404).json({ error: 'Patient not found' });
  res.status(204).end();
}
