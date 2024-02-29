import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../context/TokenContext';
import { authContext } from '../../context/AuthContext';

export default function Signin() {
 let {userToken,setToken}= useContext(userContext)
 const {  setUserId } = useContext(authContext);
  const[errMessage,setErr]=useState(null);
  const[isLoading,setLoading]=useState(false);
  let navigate=useNavigate()
let vaildationSchema=  Yup.object({
    email:Yup.string().required("email is required").email('enter availd email'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'enter availd password')
  })

// function validate(values){
// let errors={}
// if (!values.name){
//   errors.name='name is required'
// }else if(values.name.length<3){
//   errors.name='minlength is 3 chars'
// }else if (values.name.length>10){
//   errors.name='maxlength is 10 chars'
// }
// if (!values.phone){
//   errors.phone='phone is required'
// }else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
//   errors.phone='enter availd phone'
// }
// if (!values.email){
//   errors.email='email is required'
// }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
//   errors.email='enter availd email'
// }
// if (!values.password){
//   errors.password='password is required'
// }else if(!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)){
//   errors.password='enter availd password'
// }
// if (!values.rePassword){
//   errors.rePassword='repassword is required'
// }else if(values.password !== values.rePassword){
//   errors.rePassword='notmatched'
// }
// return errors 
// }
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
async function signIn(val){
  setLoading(true)
// console.log(val)
let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,val).catch((err)=>{
// console.log(err.response.data.message)
setErr(err.response.data.message)
setLoading(false)
})

// console.log(data)
if (data.message=='success'){
  navigate('/home')
  localStorage.setItem('userToken',data.token)
  setToken(data.token)
  
  let id = parseJwt(data.token).id;
  setUserId(id);
  localStorage.setItem('id', id);

  setLoading(false)
}
  }
 let formik= useFormik({
 initialValues:{
  email:'',
  password:''
 },
 validationSchema:vaildationSchema,
 onSubmit:signIn
  })
  return (
    <div>
      <form className='my-5' onSubmit={formik.handleSubmit}>
        <h1 className='text-main text-center'>Login Form</h1>
        <div className="row ">
          <div className="col-md-8 m-auto w-50 bg-light shadow p-4 ">
            <div className="row gy-4">
         
          <div className="col-md-12">
           <label htmlFor='userEmail'>Email</label>
           <input type='email' id='userEmail' onBlur={formik.handleBlur} name='email'value={formik.values.email} onChange={formik.handleChange} className='form-control'/>
           {formik.errors.email && formik.touched.email?
           <p className='text-danger'>{formik.errors.email}</p>:""
           }
          </div>
          
          <div className="col-md-12">
           <label htmlFor='userPassword'>Password</label>
           <input type='password' id='userPassword' onBlur={formik.handleBlur} name='password' value={formik.values.password} onChange={formik.handleChange} className='form-control'/>
           {formik.errors.password && formik.touched.password?
           <p className='text-danger'>{formik.errors.password}</p>:""
           }
         
          </div>
          
          {errMessage !==null ?
          <p className='text-danger'>{errMessage}</p>:
          ''
          }
          <div className="col-md-12 text-end d-flex flex-row justify-content-between mt-3">
             
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success my-2'>Login
             {isLoading ?
             <span>
             <i className='fa-solid fa-spinner fa-spin text-light mx-2 '></i>
            </span>
            :
            ''
             }
             
             </button>
          </div>
          <p className='text-muted'> <Link className='text-primary fw-bold' to ='/forgetpassword'>Forget password</Link></p>
          <p className='text-muted'>i have not an account <Link className='text-main fw-bold' to ='/signup'>Register</Link></p>
          </div>
          </div>
        </div>
      </form>
    </div>
  ) 
}
