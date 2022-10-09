import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate,Link,useParams } from 'react-router-dom';
import Listusers from './Listusers';

function Profile() {
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


  return (
    <>    
     <h1>Create /View/ Update /Delete data</h1>
     <h2><Link to="/createuser" element={<Listusers />}>Create user</Link> | <Link to="/Listusers" element={<Listusers />}>View user</Link></h2>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-6">
    <h2>Profile</h2>
   
      <Form>
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput1">
            <Form.Label>User name : {formData.name}  </Form.Label>
        </Form.Group>

      <Form.Group className="col-md-6"   controlId="exampleForm.ControlInput2">
        <Form.Label>Email: {formData.email}</Form.Label>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
        <Form.Label>Age: {formData.age}</Form.Label>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
        <Form.Label>Gender: {formData.gender}</Form.Label>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
        <Form.Label>Courses: {formData.courses}</Form.Label>
      </Form.Group>
     </Form>
    </div>
    </>
  );
}
export default Profile;