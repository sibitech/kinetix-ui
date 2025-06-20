// Handles GET (list) and POST (create) for /api/patients
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPatientsHandler, createPatientHandler } from '@kinetix/business-logic';
import { verifyFirebaseToken } from '../_middleware/firebaseAuth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await verifyFirebaseToken(req, res);
  if (res.headersSent) return;

  if (req.method === 'GET') {
    return getPatientsHandler(req, res);
  }
  if (req.method === 'POST') {
    return createPatientHandler(req, res);
  }
  res.status(405).json({ error: 'Method Not Allowed' });
}
