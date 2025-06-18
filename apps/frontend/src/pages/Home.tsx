import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFirebaseAuth } from '@kinetix/firebase-auth';

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Kinetix</h2>
            <p className="text-gray-600">You are now signed in and can access all features.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
