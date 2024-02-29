import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Signup() {
  const[errMessage,setErr]=useState(null);
  const[isLoading,setLoading]=useState(false);
  let navigate=useNavigate()
let vaildationSchema=  Yup.object({
    name:Yup.string().min(3,'min length is 3').max(15,'max length is 15').required('this name is required'),
    email:Yup.string().required("email is required").email('enter availd email'),
    phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,'phone is not vaild'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'the fisrt charcter should be capital then any 6 to 8 numbers or smallcharacter'),
    rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'not match password')
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

async function signup(val){
  setLoading(true)
// console.log(val)
let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,val).catch((err)=>{
// console.log(err.response.data.message)
setErr(err.response.data.message)
setLoading(false)
})

// console.log(data)
if (data.message=='success'){
  navigate('/signin')
  setLoading(false)
}
  }
 let formik= useFormik({
 initialValues:{
  name:'',
  email:'',
  password:'',
  phone:'',
  rePassword:''
 },
 validationSchema:vaildationSchema,
 onSubmit:signup
  })
  return (
    <div>
      <form className='my-5' onSubmit={formik.handleSubmit}>
        <h1 className='text-main text-center'>Register Form</h1>
        <div className="row ">
          <div className="col-md-8 m-auto w-50 bg-light shadow p-4 ">
            <div className="row gy-4">
          <div className="col-md-12">
           <label htmlFor='userName'>Name</label>
           <input type='text' id='userName' onBlur={formik.handleBlur} name='name' value={formik.values.name} onChange={formik.handleChange} className='form-control'/>
           {formik.errors.name && formik.touched.name?
           <p className='text-danger'>{formik.errors.name}</p>:""
           }
          </div>
          <div className="col-md-12">
           <label htmlFor='userEmail'>Email</label>
           <input type='email' id='userEmail' onBlur={formik.handleBlur} name='email'value={formik.values.email} onChange={formik.handleChange} className='form-control'/>
           {formik.errors.email && formik.touched.email?
           <p className='text-danger'>{formik.errors.email}</p>:""
           }
          </div>
          <div className="col-md-12">
           <label htmlFor='userPhone'>Phone</label>
           <input type='tel' id='userPhone' name='phone' onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} className='form-control'/>
           {formik.errors.phone && formik.touched.phone?
           <p className='text-danger'>{formik.errors.phone}</p>:""
           }
          </div>
          <div className="col-md-12">
           <label htmlFor='userPassword'>Password</label>
           <input type='password' id='userPassword' onBlur={formik.handleBlur} name='password' value={formik.values.password} onChange={formik.handleChange} className='form-control'/>
           {formik.errors.password && formik.touched.password?
           <p className='text-danger'>{formik.errors.password}</p>:""
           }
         
          </div>
          <div className="col-md-12">
           <label htmlFor='userConfirm'>rePassword</label>
           <input type='password' id='userConfirm' onBlur={formik.handleBlur} name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} className='form-control' />
           {formik.errors.rePassword && formik.touched.rePassword?
           <p className='text-danger'>{formik.errors.rePassword}</p>:""
           }
          </div>
          {errMessage !==null ?
          <p className='text-danger'>{errMessage}</p>:
          ''
          }
          <div className="col-md-12 text-end">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success my-2'>Register
             {isLoading ?
             <span>
             <i className='fa-solid fa-spinner fa-spin text-light mx-2 '></i>
            </span>
            :
            ''
             }
             
             </button>
          </div>
          <p className='text-muted'>i have an account <Link className='text-main fw-bold' to ='/signin'>login</Link></p>
          </div>
          </div>
        </div>
      </form>
    </div>
  )
}
