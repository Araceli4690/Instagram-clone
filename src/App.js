import React, { useState, useEffect } from 'react';
import Logo from './images/logo.png'
import Post from './components/Post';
import ImageUpload from './components/ImageUpload';
import { auth, db } from './firebase';
import './App.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';


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
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  //const [avatar, setAvatar] = useState('');

  useEffect(() => {
    //listens for any time any authentication change happens
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //if user has logged in
      if (authUser) {
        console.log(authUser);
        //capture user inside state, keeps user logged in
        setUser(authUser);

      } else {
        // if user has logged out
        setUser(null);
      }
    })
    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);


  //useEffect runs piece of code based on a specific condition
  useEffect(() => {
    //this is where code runs
    //onSnapshot runs code everytime a change happens
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
          //profile: avatar
        })
      })
      //if any error occurs alert sent
      .catch((error) => alert(error.message))
    //modal closes after singup
    setOpen(false);
  }
  const signIn = ((event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    //modal closes after login
    setOpenSignIn(false);
  })

  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img className="app__headerImage" src={Logo} alt=""></img>
        {user ? (
          <Button style={{ color: "black" }} onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button style={{ color: "black" }} onClick={() => setOpenSignIn(true)}>Login</Button>
            <Button style={{ color: "black" }} onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
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
            {/** onChange set avatar */}
            <Button style={{ color: "black" }} type="submit"
              onClick={signUp}>Sign Up
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        //setting state of modal to false to close it
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src={Logo} alt=""></img>
            </center>
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
            <Button style={{ color: "black" }} type="submit"
              onClick={signIn}>Login
            </Button>
          </form>
        </Box>
      </Modal>

      <div className="app__posts">
        {posts.map(({ id, post }) => (
          //key lets react know to just update new post and not refresh old ones
          //avatar={post.avatar}
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))}

        {user?.displayName ? (
          //avatar={user.profile}
          <ImageUpload username={user.displayName} />
        ) : (
          <h3>Login to upload</h3>
        )}
      </div>



    </div >

  );
}

export default App;


