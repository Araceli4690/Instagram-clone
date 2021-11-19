import React, { useState, useEffect } from 'react';
import Logo from './images/logo.png'
import Post from './components/Post';
import { db } from './firebase';
import './App.css';
import { ClassNames } from '@emotion/react';

function App() {
  const [posts, setPosts] = useState([]);
  //create state for modal
  const [open, setOpen] = useState(false);
  //useEffect runs piece of code based on a specific condition
  useEffect(() => {
    //this is where code runs
    //onSnapshot runs code everytime a change happens
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        //doc.id get individual doc data
        id: doc.id,
        //posting doc data
        post: doc.data()
      })))
    })
  }, []);
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={ClassNames.paper}>
          <h2>Modal</h2>
        </div>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img className="app__headerImage" src={Logo} alt=""></img>
      </div>
      <h1> HELLO</h1>
      {posts.map(id, post => [
        //key lets react know to just update new post and not refresh old ones
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ])}

      {/* Posts */}
      {/* Posts */}
    </div>

  );
}

export default App;


