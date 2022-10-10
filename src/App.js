import './App.css';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Listusers from './Listusers';
import Createuser from './Createuser';
import Edituser from './Edituser';
import Profile from './Profile';

function App() {
    return (
    <div>
      
    <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="Listusers" element={ <Listusers/> } />
        <Route path="Createuser" element={ <Createuser/> } />
        <Route path="Edituser/:userId" element={ <Edituser/> } />
        <Route path="Profile/:userId" element={ <Profile/> } />
      </Routes>
    </div>
  );
} 

export default App;