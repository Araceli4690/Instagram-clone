import React, { useState, useEffect } from 'react';
import Logo from './images/logo.png'
import Post from './components/Post';
import { auth, db } from './firebase';
import './App.css';
import { ClassNames } from '@emotion/react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  //create state for modal
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  //signup function
  const signUp = (event) => {
    event.preventDefault();
    //create user
    auth.createUserWithEmailAndPassword(email, password)
      //if any error occurs alert sent
      .catch((error) => alert(error.message))
  }

  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img className="app__headerImage" src={Logo} alt=""></img>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
        <Modal
          open={open}
          //setting state of modal to false to close it
          onClose={() => setOpen(false)}
        >
          <Box sx={style}>
            <form className="app__signup">
              <center>
                <img className="app__headerImage" src={Logo} alt=""></img>
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}>
              </Input>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
              </Input>
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
              </Input>
              <Button type="submit"
                onClick={signUp}>Sign Up</Button>
            </form>
          </Box>
        </Modal>
      </div>
      <h1> HELLO</h1>
      {posts.map(({ id, post }) => (
        //key lets react know to just update new post and not refresh old ones
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))}

      {/* Posts */}
      {/* Posts */}
    </div>

  );
}

export default App;


