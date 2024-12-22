import React from 'react';
import { Toaster } from 'react-hot-toast';
import MainPage from './pages/MainPage';
import AuthGuard from './components/auth/AuthGuard';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { MessengerProvider } from './features/messenger/contexts/MessengerContext';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <ProfileProvider>
          <MessengerProvider>
            <AuthGuard>
              <MainPage />
            </AuthGuard>
          </MessengerProvider>
        </ProfileProvider>
      </AuthProvider>
    </>
  );
};

export default App;