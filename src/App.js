import React from 'react';
import './App.css';
import PostList from './components/PostList';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>ReactReddit</h1>
    </header>
    <PostList />
  </div>
);

export default App;
