import React, { useState } from 'react';
import '../index.css';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login process with delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid username or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className='flex min-h-screen justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 font-sans p-4'>
      <div className='bg-white p-10 rounded-xl shadow-xl w-full max-w-md border border-slate-200'>
        <h2 className='text-3xl font-semibold text-slate-800 text-center mb-8 tracking-tight'>
          Welcome Back
        </h2>

        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700 mb-1'>
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              className='px-4 py-3 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 outline-none bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='px-4 py-3 border-2 border-slate-200 rounded-lg text-base transition-all duration-200 outline-none bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
              required
            />
          </div>

          {error && (
            <div className='bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm border border-red-200 text-center'>
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className={`px-6 py-3 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 mt-2 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200'
            }`}
          >
            {isLoading ? (
              <>
                <div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className='text-xs text-gray-500 text-center mt-4 p-3 bg-gray-50 rounded-md border border-gray-200'>
          💡 Demo credentials: <br />
          <strong>Username:</strong> admin <br />
          <strong>Password:</strong> password
        </div>
      </div>
    </div>
  );
};

export default Login;
