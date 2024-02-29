import React, {  useContext, useLayoutEffect, useState } from 'react';
import styles from './WishList.module.scss';

import axios from 'axios';
import { toast } from 'react-toastify'
import { useQuery } from "react-query";
import { WishContext } from '../../context/wishContext';
export default function WishList() {


let {callApi} = useContext(WishContext)

  function getdata() {

    return callApi();
  
  }
  let {data} = useQuery("wishList",getdata,{
    cacheTime:0,
    refetchInterval:10,
  });
 


  async function deleteWish(productId,e){
    let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    toast.success(data.message)
    getdata()
    
    localStorage.removeItem("idwish")
  }


  if (data?.data.length === 0) {
    return <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>No items in wishlist</h2>
    </div>
}


  return <>

 <div>
 <div className="container">
  
 {data?.data.map((item,index)=>(
   <div className="row mt-1" key={index}>

   <div className='shadow p-5'>
   <div className="col-md-4 ">
   <img src={item.imageCover} className='w-100 mt-1' alt="" />
  
   </div>
   <div className="col-md-8">
   <h2 className='text-center fs-6 mt-3'>{item.title}</h2>
   <div className="d-flex justify-content-between p-1">
   <h2 className='text-center fs-6 mx-1 mt-4'>{item.price}EGP</h2>
   <span className='text-center fs-6 '> <i  className="fas fa-star text-warning fs-6"></i>{item.ratingsAverage}</span>
   <i onClick={(e)=>deleteWish(item.id,e)} className='fa fa-trash text-success btn fs-6'></i>
</div>
</div>
</div>
</div>))}
</div>
</div>


   
  </>
}
