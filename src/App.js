import React from 'react';
import Logo from './images/logo.png'
import Post from './components/Post';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img className="app__headerImage" src={Logo} alt=""></img>
      </div>
      <h1> HELLO</h1>
      <Post />
      {/* Posts */}
      {/* Posts */}
    </div>

  );
}

export default App;


