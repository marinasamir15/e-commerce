import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/cartContext';

export default function Checkout() {
let{checkoutPayment,getCart}=  useContext(cartContext)

  const[errMessage,setErr]=useState(null);
  const[isLoading,setLoading]=useState(false);
  const [cartId,setCartId]=useState('')
  
  useEffect(()=>{
    (async()=>{
    let data=await getCart();
  setCartId(data.data.data._id)
    })()
  },[])
async function payment(val){
  
 let data=await checkoutPayment(cartId,val)
console.log(data)
if(data.data.status=='success'){
  window.location=data.data.session.url
}
  }
 let formik= useFormik({
 initialValues:{
  details:'',
  city:'',
  phone:''
 },
 onSubmit:payment
  })
  return (
    <div>
      <form className='my-5' onSubmit={formik.handleSubmit}>
        <h1 className='text-main text-center'>Payment Form</h1>
        <div className="row ">
          <div className="col-md-8 m-auto w-50 bg-light shadow p-4 ">
            <div className="row gy-4">
         
          <div className="col-md-12">
           <label htmlFor='userDetails'>Details</label>
           <input type='text' id='userDetails'  name='details'value={formik.values.details} onChange={formik.handleChange} className='form-control'/>
          
          </div>
          
          <div className="col-md-12">
           <label htmlFor='userCity'>City</label>
           <input type='text' id='userCity'  name='city' value={formik.values.city} onChange={formik.handleChange} className='form-control'/>
          </div>

           
          <div className="col-md-12">
           <label htmlFor='userPhone'>Phone</label>
           <input type='tel' id='userPhone'  name='phone'value={formik.values.phone} onChange={formik.handleChange} className='form-control'/>
          
          </div>
          
         
          <div className="col-md-12 text-end">
            <button  type='submit' className='btn btn-success my-2'>Pay
          
             
             </button>
          </div>
          
          </div>
          </div>
        </div>
      </form>
    </div>
  ) 
}
