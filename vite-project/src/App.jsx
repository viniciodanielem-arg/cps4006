import React from 'react';
import NavMenu from './components/NavMenu';
import UserCard from './components/UserCard';
import TodoList from './components/ToDoList';
import Counter from './components/Counter';
import Timer from './components/Timer';
import ThemeManager from './components/ThemeManager';
import SortableList from './components/SortableList';

function App() {
  return (
    <div>
      <NavMenu />
      <ThemeManager />
      <h1>Welcome!</h1>
      <UserCard age={30} email="john.doe@example.com" />
      <Counter />
      <TodoList />
      <SortableList />
      <Timer />
    </div>
  );
}

export default App;