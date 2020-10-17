import React, {useState} from "react";
import { Link,Redirect } from "react-router-dom";
import Base from "../core/Base";
import {signin,authenticate,isAutheticated} from "../auth/helper"

const Signin = () => {

   const[values,setValues] = useState({
       email: "samson@gmail.com",
       password: "12345",
       error: "",
       loading: false,
       didRedirect:false
   }) 
const {email,password,error,loading,didRedirect} = values
const {user} = isAutheticated();


const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
const onSubmit=event =>{
    event.preventDefault();
    setValues({...values,error:false,loading:true})
    signin({email,password})
    .then(data =>{
        if(data.error){
            setValues({...values,error:data.error,loading:false})
        }
        else {
            authenticate(data,() =>{
                setValues({
                    ...values,
                    didRedirect:true
                })
            })
        }
    })
    .catch(console.log("sign-in failed"))
}

const performRedirect =() =>{
    if(didRedirect){
        if(user && user.role ===1){
            return <Redirect to="/admin/dashboard"/>
        }else {
            return  <Redirect to="/user/dashboard"/>
        }
    }
    if(isAutheticated()){
        return <Redirect to = "/" />;
    }
}
  const loadingMessage = () => {
      return (
        loading && (
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-info">
<h3>Loading...</h3>
            </div>
            </div>
            </div>
        )
      );
      };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };


    const signInForm =() =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        
                        <div className="form-group">
                            <label  className="text-light">Email </label>
                            <input className="form-control" 
                            type="email"
                            onChange={handleChange("email")}
                            value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Password </label>
                            <input
                            onChange={handleChange("password")}
                             value={password} className="form-control" type="password"/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Sign In Page" description="A Page for user to Sign In!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
         <p className="text-white text-enter">{JSON.stringify(values)}</p>
        </Base>
    )
}
export default Signin;