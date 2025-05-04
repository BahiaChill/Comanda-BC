import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import OrderScreen from './components/OrderScreen';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <OrderScreen username={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;

// DONE