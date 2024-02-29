import React from 'react'
import Products from '../Products/Products'
import Category from '../Category/Category'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategorySilder from '../CategorySilder/CategorySilder'


export default function Home() {
  
  return (
    <div className='mt-3'>
      <HomeSlider/>
      <h2 className='mt-3'>Categories</h2>
      
      <CategorySilder/>
    
      <h2 className='mt-3'>Products</h2>
      <Products/>
    </div>
  )
}
