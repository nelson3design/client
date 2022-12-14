import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Oval } from 'react-loader-spinner'
import "./style/slide.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";

export default function Slide() {

  const [item, setItem] = useState([])
  const [item2, setItem2] = useState([])
  const url = "https://server-4w73.onrender.com/desktop"
  const url2 = "https://server-4w73.onrender.com/mobile"
  const url3 = "https://server-4w73.onrender.com/"

  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
  
    listItem()

  }, [])

  const listItem = () => {
    axios.get(`${url}`).then((response) => {
      if (response.status == 200) {
        setSpinner(false)
        setItem(response.data);
       
      }

    });
    axios.get(`${url2}`).then((response) => {
      if (response.status == 200) {
        setSpinner(false)
        setItem2(response.data);
       
      }

    });
  }
  return (
    <>
      
      <Swiper
      
        loop={true}
        cssMode={true}
        navigation={false}
        pagination={true}
        mousewheel={true}
        keyboard={true}
         loopFillGroupWithBlank={true}
         autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        
        modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"
        id="bannerDesktop"
      >
        {

          item && item.map((dados) => (
            <SwiperSlide>
          
              <a href={dados.link}><img src={url3 + dados.file} alt={url3 + dados.file} /></a>

            </SwiperSlide>
          ))
        }

       
       
      </Swiper>
      

     

      <Swiper
      
        loop={true}
        cssMode={true}
        navigation={false}
        pagination={true}
        mousewheel={true}
        keyboard={true}
         loopFillGroupWithBlank={true}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"
        id="bannerMobile"
      >
       
        {

          item2 && item2.map((dados) => (
            <SwiperSlide>
            
              <a href={dados.link}><img src={url3 + dados.file} alt={url3 + dados.file} /></a>
                 
            </SwiperSlide>
          ))
        }

       
      </Swiper>
      
    </>
  );
}
