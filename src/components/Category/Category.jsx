
import React from 'react';
// import styles from './Categories.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
// import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BallTriangle } from 'react-loader-spinner';

export default function Categories() {

 

async function getCategories(){
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  return data
}


let {data , isLoading } = useQuery("categories", getCategories)



return <>
<Helmet>
<title>Categories</title>
<meta name="description" content="Helmet application" />
</Helmet>
{ data?.data.length>0 ?  
  <div className="container py-2">
    <h2>Category</h2>
    <div className="row">
      {data?.data.map((product) => (
        <div  key={product._id} className="card col-md-3 mt-5 mx-1 cursor-pointer " width={200}>
        <Link to={`/sub/${product._id}`} className='text-decoration-none'>
          <img src={product.image} height={300} className='w-100' alt=""/>
          <div className="card-body">
          <h2 className='text-center text-dark'>{product.name}</h2>
          </div>
          </Link>
        </div>
        
      ))}
    </div>
  </div>
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


</> 

}