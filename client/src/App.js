import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import EditProfileForm from './components/EditProfile';
import NewPost from './components/NewPost';
import {io} from 'socket.io-client'

function App() {

  const [socket] = useState(()=>io(process.env.MY_PORT))
  useEffect( ()=>{
    socket.on('connection', ()=>{
      console.log('Socket connection to server')
    })
    return () => socket.disconnect(true);
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginForm/>} path="/socialmedia" default/>
          <Route element={<Homepage/>} path="/socialmedia/home"/>
          <Route element={<EditProfileForm/>} path="/socialmedia/home/user/:id"/>
          <Route element={<NewPost/>} path="/socialmedia/home/user/newpost"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
