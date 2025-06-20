// Handles GET, PUT, DELETE for /api/patients/{id}
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPatientByIdHandler, updatePatientHandler, deletePatientHandler } from '@kinetix/business-logic';
import { verifyFirebaseToken } from '../_middleware/firebaseAuth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await verifyFirebaseToken(req, res);
  if (res.headersSent) return;

  if (req.method === 'GET') {
    return getPatientByIdHandler(req, res);
  }
  if (req.method === 'PUT') {
    return updatePatientHandler(req, res);
  }
  if (req.method === 'DELETE') {
    return deletePatientHandler(req, res);
  }
  res.status(405).json({ error: 'Method Not Allowed' });
}
