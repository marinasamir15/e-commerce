import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'

export default function Products() {
let {addToCart,setCartNumber}=useContext(cartContext)


  const [productList,setProduct]=useState([])
 async function getProducts(){
 let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
 setProduct(data.data)
  }

 async function addToMyCart(id){
  let {data} =await addToCart(id)
  if(data.status='success'){
    toast.success(data.message);
    setCartNumber(data.numOfCartItems)
  }
  }
  useEffect(()=>{
    getProducts()
    
  },[])

  const [isClicked, setIsClicked] = useState(false);

  let y=[]

  
  async function addtoWish(productId,e){
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      productId
    },{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    y.push(productId)
    e.target.classList.replace('text-info','text-danger')
    setIsClicked(!isClicked)
    localStorage.setItem("idwish",y)
    toast.success(data.message)
  }
  return (
    <div className='row'>
      {productList.length>0 ?
      <>
      {productList.map((product)=>{
        return <div className="col-md-3" key={product._id}>
         <div className="product p-5">
          <Link to={`/details/${product._id}`}>
          <img src={product.imageCover} className='w-100' alt={product.title}/>
          <p className='text-main'>{product.category.name}</p>
          <h6>{product.title}</h6>
          <div className='d-flex justify-content-between '>
          <p>{product.price} EGP</p>
          <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></p>
          </div>
          </Link>
          <span  onClick={(e) => addtoWish(product.id,e)}><i className="fas fa-heart text-info"></i></span>
          <button onClick={()=>{addToMyCart(product._id)}} className='btn btn-success w-100'>Add To Cart</button>
         </div>
        </div>
      })}
      </>
      :
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
  )
}
