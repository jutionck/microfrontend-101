import React from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  const handleLogin = () => {
    console.log('Login successful in standalone mode');
  };

  return (
    <div className='App'>
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default App;
