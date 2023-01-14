import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from '../../actions/auth';
import { PropTypes } from 'prop-types';

const  Register=({ register })=>{
    const [formData,updateFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmpw:''
    });
    const{name,email,password,confirmpw}=formData;
    //onChange Handler configure to handle change for all fields
    const onChange=e=>updateFormData({
        ...formData,
            [e.target.name]:e.target.value
    });
    //onSubmit handler
    const onSubmit=e=>{
        e.preventDefault();
        if(password !== confirmpw){
            console.log("Invalid Password");
        }
        else{
          

        register({name,email,password});
        }
    }    
return(
<div>
        <h1 className="large test-primary">Register</h1>
       
        <p className="cta"><i className="fas fa-address-card"></i>Specify your account info</p>
        <form className="form" onSubmit={e=>onSubmit(e)}>
         <div className="form-group">
		 <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onChange(e)} required/>
		 </div>
		 <div className="form-group">
		 <input type="email" placeholder="Email-Address"  name="email" value={email} onChange={e=>onChange(e)} required/>
		 </div>
		 <div className="form-group">
		 <input type="password"  placeholder="Password" name="password" value={password} onChange={e=>onChange(e)} minLength="4"/>    
		 </div>
		 <div className="form-group">
		 <input type="password" placeholder="Confirm Password" name="confirmpw" value={confirmpw} onChange={e=>onChange(e)} minLength="4"/>    
		 </div>
		 <input type="submit" className="btn btn-primary" value="Register"/>
		 </form>
		 <p className="m">Already have account<Link to='/login'>Login</Link>
         </p>
         </div>
)
};

Register.proTypes={
    register:PropTypes.func.isRequired,
};
export default connect(null,{register})(Register);