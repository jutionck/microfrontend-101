import React, { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'; // Import Tailwind CSS for remote components

const Login = React.lazy(() => import('loginApp/Login'));
const TodoList = React.lazy(() => import('todoApp/TodoList'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state for session check

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = () => {
      const savedSession = localStorage.getItem('microfrontend_session');
      if (savedSession) {
        try {
          const session = JSON.parse(savedSession);
          if (session.isLoggedIn && session.user && session.timestamp) {
            // Check if session is still valid (24 hours)
            const now = new Date().getTime();
            const sessionAge = now - session.timestamp;
            const twentyFourHours = 24 * 60 * 60 * 1000;
            
            if (sessionAge < twentyFourHours) {
              setIsLoggedIn(true);
              setUser(session.user);
            } else {
              // Session expired, clear it
              localStorage.removeItem('microfrontend_session');
            }
          }
        } catch (error) {
          // Invalid session data, clear it
          localStorage.removeItem('microfrontend_session');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const handleLogin = () => {
    const sessionData = {
      isLoggedIn: true,
      user: 'admin',
      timestamp: new Date().getTime()
    };
    
    localStorage.setItem('microfrontend_session', JSON.stringify(sessionData));
    setIsLoggedIn(true);
    setUser('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('microfrontend_session');
    setIsLoggedIn(false);
    setUser('');
  };

  const LoadingComponent = ({ message }: { message: string }) => (
    <div className='flex justify-center items-center min-h-[400px] bg-white rounded-xl shadow-lg mx-auto my-8 max-w-2xl'>
      <div className='flex flex-col items-center gap-4 text-slate-600'>
        <div className='w-8 h-8 border-3 border-slate-200 border-t-blue-500 rounded-full animate-spin'></div>
        <p>{message}</p>
      </div>
    </div>
  );

  // Show loading screen while checking session
  if (isLoading) {
    return (
      <div className='min-h-screen bg-slate-50 font-sans flex justify-center items-center'>
        <div className='flex flex-col items-center gap-4 text-slate-600'>
          <div className='w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin'></div>
          <p className='text-lg font-medium'>Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50 font-sans'>
      {/* Only show header when user is logged in */}
      {isLoggedIn && (
        <header className='bg-white shadow-lg px-8 py-4 flex justify-between items-center border-b border-slate-200'>
          <h1 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
            🚀 Microfrontend Dashboard
          </h1>
          <div className='flex items-center gap-4 text-sm text-slate-600'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span>Welcome, <strong>{user}</strong></span>
            </div>
            <button
              onClick={handleLogout}
              className='px-4 py-2 bg-red-500 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-red-600'
              title='Logout and clear session'
            >
              Logout
            </button>
          </div>
        </header>
      )}

      <main className={isLoggedIn ? 'p-8 max-w-6xl mx-auto' : ''}>
        {!isLoggedIn ? (
          <ErrorBoundary
            fallback={
              <div className='text-center text-red-600 p-4'>
                Failed to load Login component
              </div>
            }
          >
            <Suspense
              fallback={<LoadingComponent message='Loading secure login...' />}
            >
              <Login onLogin={handleLogin} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <ErrorBoundary
            fallback={
              <div className='text-center text-red-600 p-4'>
                Failed to load Todo component
              </div>
            }
          >
            <Suspense
              fallback={<LoadingComponent message='Loading your tasks...' />}
            >
              <TodoList />
            </Suspense>
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}

export default App;
