import React, { useState } from 'react';
import Logo from './images/logo.png'
import Post from './components/Post';
import './App.css';

function App() {
  const [posts, setPosts] = useState([
    {
      username: 'test',
      caption: 'wow it works',
      imageUrl: 'https://thumbs.dreamstime.com/b/cute-portrait-dog-pembroke-welsh-corgi-wear-cap-birthday-stretches-its-muzzle-to-delicious-cake-owner-hand-bright-pink-172610682.jpg'
    },
    {
      username: 'test',
      caption: 'wow it works',
      imageUrl: 'https://thumbs.dreamstime.com/b/cute-portrait-dog-pembroke-welsh-corgi-wear-cap-birthday-stretches-its-muzzle-to-delicious-cake-owner-hand-bright-pink-172610682.jpg'
    }
  ]);
  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img className="app__headerImage" src={Logo} alt=""></img>
      </div>
      <h1> HELLO</h1>
      {posts.map(post => [
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ])}

      {/* Posts */}
      {/* Posts */}
    </div>

  );
}

export default App;


