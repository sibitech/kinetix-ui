// Firebase Auth middleware for Vercel serverless functions
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function verifyFirebaseToken(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }
  const idToken = match[1];
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    (req as any).user = decoded;
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
