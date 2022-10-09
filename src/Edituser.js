import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link,useParams } from 'react-router-dom';
import Listusers from './Listusers';

function Edituser() {
const navigate = useNavigate();
const params = useParams();

let formValues={
  id:"",
  name:"",
  age:"",
  email:"",
  gender:"",
  courses:"",
  error:{
    name:"",
    age:"",
    email:"",
    gender:"",
    courses:"",
  }
}
const [formData,setFormdata]=useState(formValues); 
const [userdata,setUserdata]=useState([]);

useEffect(() => {

async function getData(rowId){
   console.log('row id='+rowId);
    const response = await axios.get(`https://61fcdb8ff62e220017ce41c1.mockapi.io/users/${rowId}`);
    const response1 = response.data;
    console.log(response1);
    setFormdata({...formData,
            id:response1.id,
            name:response1.name,
            age:response1.age,
            email:response1.email,
            gender:response1.gender,
            courses:response1.courses,
    });    
}
getData(params.userId);//call user data when loading the file
},[]);

const handleChange =(e)=>{
  let error= { ...formValues.error };
  if(e.target.value === ""){
    error[e.target.name]=`${e.target.name} is required`;
  }else{
    error[e.target.name]=""; 
  }
  setFormdata({...formData, [e.target.name]:e.target.value, error});
}

const handleSubmit= async (e)=>{
  e.preventDefault();

  const errorkeys=Object.keys(formData).filter((key)=>{
    if(formData[key] === "" && key!='error'){
      return key;
    }
  });
  
  if(errorkeys.length>0){
    alert('pls fill all the fields');
  }else{
      const response=await axios.put(`https://61fcdb8ff62e220017ce41c1.mockapi.io/users/${formData.id}`,{
        name:formData.name,
        age:formData.age,
        email:formData.email,
        gender:formData.gender,
        courses:formData.courses
      });
      let users = [ ...userdata ];
      let index = userdata.findIndex((row)=>row.id === response.data.id);
      users[index]= response.data;
      setUserdata(users); 
      alert('updated successfully');
      setFormdata(formValues);
      navigate('/Listusers');
    }
 } 

    return (
    <>    
     <h1>Create /View/ Update /Delete data</h1>
     <h2><Link to="/createuser" element={<Listusers />}>Create user</Link> | <Link to="/Listusers" element={<Listusers />}>View user</Link></h2>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-6">
    <h2>Update user</h2>
   
      <Form  onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput1">
            <Form.Label>User name</Form.Label>
            <Form.Control  type="text" placeholder="name"  name="name" value={formData.name}  onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.name}</span><br/>
        </Form.Group>

      <Form.Group className="col-md-6"   controlId="exampleForm.ControlInput2">
        <Form.Label>User email</Form.Label>
        <Form.Control  type="text"  placeholder="email" name="email" value={formData.email}  onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.email}</span><br/>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
        <Form.Label>User age</Form.Label>
        <Form.Control size="lg" type="text" placeholder="age" name="age" value={formData.age} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.age}</span><br/>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput4" name="gender">
        <Form.Check
          value="male"
          type="radio"
          aria-label="radio 1"
          label="male"
          onChange={(e)=>handleChange(e)}
          name="gender"
          checked={formData.gender === "male"}
        />
        <Form.Check
          value="female"
          type="radio"
          aria-label="radio 2"
          label="Female"
          onChange={(e)=>handleChange(e)}    
          name="gender"
          checked={formData.gender === "female"} 
        />
        <Form.Check
          value="other"
          type="radio"
          aria-label="radio 3"
          label="Other"
          name="gender"
          onChange={(e)=>handleChange(e)}     
        />
      </Form.Group> <br/>
      
      <Form.Select name="courses" className="col-md-6"  onChange={(e)=>handleChange(e)} aria-label="Default select example">
          <option value="">select</option>
          <option value="react" selected={formData.courses === "react"}>React</option>
          <option value="node js" selected={formData.courses === "node js"}>Node js</option>
          <option value="javascript" selected={formData.courses === "javascript"}>Javascript</option>
      </Form.Select><br/>

     
      <Button type="submit" variant="primary">Save</Button>
  
     </Form>
    </div>
    </>
  );
}

export default Edituser;