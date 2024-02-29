import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
 const [data,setData]= useState([]);
 const [cartPrice,setPrice]= useState([])
//  ,clearCart
let {getCart,updateCart,deleteCart,setCartNumber}=  useContext(cartContext);
useEffect(()=>{
  (async()=>{
  let data=await getCart();
  setData(data.data.data.products)
  setPrice(data.data.data.totalCartPrice)

  })()
},[])
async function removeProduct(id){
let data= await deleteCart(id)
setData(data.data.data.products)
setPrice(data.data.data.totalCartPrice)
setCartNumber(data.data.numOfCartItems)
// console.log(data)
}
// async function clearProducts(){
//   let data= await clearCart()
//   // setData(data.data.data.products)
//   // setPrice(data.data.data.totalCartPrice)
//   // setCartNumber(data.data.numOfCartItems)
//   console.log(data)
//   }
async function updateProduct(id,count){
  // if(count==0){
  //   deleteCart(id)
  // }
  let data= await updateCart(id,count)
  setData(data.data.data.products)
  setPrice(data.data.data.totalCartPrice)
  setCartNumber(data.data.numOfCartItems)
  // console.log(data)
  }
  return (
    <div className='container'>
      <h2>Shopping Cart</h2>
      <Link to='/checkout' >
        <div className='text-end'>
        <button className='btn btn-success'>Online Payment</button>
        </div>
      </Link>
      <div className="row">
        <div className="col-md-11 bg-main-light shadow p-5 m-auto my-5" >
          <h3><span className='text-main fw-bold'>Total Price </span>{cartPrice}</h3>
          {/* <button onClick={clearProducts} className="btn btn-danger">Clear Cart</button> */}
          
          {data.map((product)=>{
            return  <div className="row border-bottom py-5" key={product._id}>
              <div className="col-md-1">
               <img src={product.product.imageCover} alt="cover" className='w-100' />
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center">
               <div>
                <h5>{product.product.title}</h5>
                <p>{product.price}</p>
                <button onClick={()=>{removeProduct(product.product._id)}} className='btn btn-outline-danger'> <i className='fa-regular fa-trash-can'></i> Remove</button>
               </div>
               <div>
               <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className='btn btn-outline-success'> + </button>
               <span className='mx-2'>{product.count}</span>
               <button onClick={()=>{updateProduct(product.product._id,product.count-1)}} className='btn btn-outline-success'> - </button>
               </div>
              </div>
            </div>
          })}
        </div>

      </div>
    </div>
  )
}
