import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate } from 'react-router-dom';
import Createuser from './Createuser';



function Listusers(){
    const navigate = useNavigate();

    const [userdata,setUserdata]=useState([]);
    
useEffect(() => { 
    async function getData(){
        const response=await axios.get("https://61fcdb8ff62e220017ce41c1.mockapi.io/users");
        setUserdata(response.data);  
}    
    getData();//call user data when loading the file
    
},[]);

const handleProceed = (id,status) => {
    if(status==1){  navigate(`/Edituser/${id}`); }else{ navigate(`/profile/${id}`); }
  };

  async function onDeleteData(id){
     await axios.delete(`https://61fcdb8ff62e220017ce41c1.mockapi.io/users/${id}`);
    
    var responseData=userdata.filter(item => id !== item.id);
    setUserdata(responseData);  
     alert('deleted successfully');
  }  

    return (
        <>
        <h1>Welcome to USER Dashboard to view CRUD</h1>
        <h2> <Link to="/Createuser" element={<Createuser />}>Create user</Link></h2>
        <h2 style={{textAlign:"center"}}>List users</h2>
    <Table striped bordered hover className='table'>
    <thead>
     <tr>
       <th>Id</th>
       <th>Name</th>
       <th>Age</th>
       <th>Email</th>
       <th>Gender</th>
       <th>Courses</th>
       <th>Action</th>
       </tr>
       </thead> 
       <tbody>   
       {userdata ? (
         userdata.map((row) => (   
       <tr key={row.id}>
       <td>{row.id}</td>
       <td>{row.name}</td>
       <td>{row.age}</td>
       <td>{row.email}</td>
       <td>{row.gender}</td>
       <td>{row.courses}</td>
       <td>
          <Button onClick={(e)=>handleProceed(row.id,1)}>Update</Button>&nbsp;
          <Button onClick={(e)=>handleProceed(row.id,2)}>View profile</Button>&nbsp;
           <Button onClick={()=>onDeleteData(row.id)}>Delete</Button>
       </td>
       </tr>
     )))
     :" Loading..." }
     </tbody>
    </Table>
    </>
  );
}

export default Listusers;