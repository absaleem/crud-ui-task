import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Listusers from './Listusers';
import Createuser from './Createuser';

function Dashboard() {
    return (
    <>       
        <h1>Welcome to USER Dashboard to view CRUD</h1>
        <h2> <Link to="/Createuser" element={<Createuser />}>Create user</Link> | 
        <Link to="/Listusers" element={<Listusers />}>View user</Link></h2>
    </>
    );
} 

export default Dashboard;