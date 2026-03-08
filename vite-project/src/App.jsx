import React from 'react';
import NavMenu from './components/NavMenu';
import UserCard from './components/UserCard';

const App = () => {
  return (
    <div>
      <NavMenu />
      <h1>Welcome!</h1>
      <UserCard age={30} email="john.doe@example.com" />
    </div>
  );
}

export default App;