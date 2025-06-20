import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFirebaseAuth } from '@kinetix/firebase-auth';
import { PatientTable } from '../components/PatientTable';
import { Tabs, Tab, Box } from '@mui/material';

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  const handleSignOut = async () => {
    try {
      const auth = getFirebaseAuth();
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Kinetix</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.email || 'User'}
              </span>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Patients" />
            <Tab label="Appointments" />
          </Tabs>
        </Box>
        <div className="px-4 py-6 sm:px-0">
          {tab === 0 && <PatientTable />}
          {tab === 1 && (
            <Box sx={{ p: 3, textAlign: 'center', color: 'gray' }}>
              <h2>Appointments</h2>
              <p>Appointment management coming soon.</p>
            </Box>
          )}
        </div>
      </main>
    </div>
  );
}
