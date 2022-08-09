import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import EditProfileForm from './components/EditProfile';
import NewPost from './components/NewPost';

function App() {
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
