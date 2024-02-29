import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'


export default function Details() {
  let {addToCart,setCartNumber}=useContext(cartContext)
  const [productDetails,setDetails]=useState(null)
  let params=useParams()
  let productId=params.id
 
  async function getproduct(){
 let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)  
  // console.log(data.data)
  setDetails(data.data)
 

}
async function addToMyCart(id){
  let {data} =await addToCart(id)
  if(data.status='success'){
    toast.success(data.message);
    setCartNumber(data.numOfCartItems)
  }
  }
useEffect(()=>{
  getproduct()
},[])
  return (
    <div className='container my-5'>
      <div className="row">
        {productDetails !=null?
        <>
         <div className="col-md-3">
          <img src={productDetails?.imageCover} className='w-100' alt='cover' />

        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around">
          <div>
            <h2>{productDetails?.title} </h2>
            <p>{productDetails?.description}</p>

          </div>
          <div>
            <p> {productDetails?.category.name}</p>
            <div className='d-flex justify-content-between'>
            <p><span className='text-main'>Price : </span>{productDetails?.price}</p>
            <p><span >Rating : </span>{productDetails?.ratingsAverage} <i className='fa-solid fa-star rating-color'></i></p>
            </div>
           
            <button onClick={()=>{addToMyCart(productDetails._id)}} className='btn btn-success w-100'>Add to Cart</button>
          </div>
        </div>
        </>:
         <div className='vh-100 d-flex justify-content-center align-items-center'>
         <BallTriangle
           height={100}
           width={100}
           radius={5}
           color="#4fa94d"
           ariaLabel="ball-triangle-loading"
           wrapperStyle={{}}
           wrapperClass=""
           visible={true}
           />
           </div>
        }
       

      </div>

    </div>
  )
}
