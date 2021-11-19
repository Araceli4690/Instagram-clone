import React, { useState, useEffect } from 'react';
import Logo from './images/logo.png'
import Post from './components/Post';
import { db } from './firebase';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  //useEffect runs piece of code based on a specific condition
  useEffect(() => {
    //this is where code runs
    //onSnapshot runs code everytime a change happens
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, []);
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


