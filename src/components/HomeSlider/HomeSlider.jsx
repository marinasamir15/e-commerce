import React from 'react'
import Slider from "react-slick";
import  imgSlider1 from '../../assets/img/slider-image-1.jpeg';
import  imgSlider2 from '../../assets/img/slider-image-2.jpeg';
import  imgSlider3 from '../../assets/img/slider-image-3.jpeg';
import  imgSlider4 from '../../assets/img/blog-img-1.jpeg';
import  imgSlider5 from '../../assets/img/blog-img-2.jpeg'
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className='row g-0'>
      <div className="col-md-8">
      <Slider {...settings}>
      <img src={imgSlider3} className='w-100' alt='imgSlider1' height={500}/>
       <img src={imgSlider4} className='w-100' alt='imgSlider1' height={500}/>
       <img src={imgSlider5} className='w-100' alt='imgSlider1' height={500}/>
     
      </Slider>
      </div>
      <div className="col-md-4">
       <img src={imgSlider1} className='w-100' alt='imgSlider1' height={250}/>
       <img src={imgSlider2} className='w-100' alt='imgSlider1' height={250}/>
      </div>
    </div>
  )
}
