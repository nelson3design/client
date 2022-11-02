import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style/slide.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";

export default function Slide() {

  const [item, setItem] = useState([])
  const [item2, setItem2] = useState([])
  const url = "http://localhost:4000/desktop"
  const url2 = "http://localhost:4000/mobile"
  const url3 = "http://localhost:4000/"

  useEffect(() => {


    listItem()

  }, [])

  const listItem = () => {
    axios.get(`${url}`).then((response) => {
      setItem(response.data);

    });
    axios.get(`${url2}`).then((response) => {
      setItem2(response.data);

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
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"
        id="bannerDesktop"
      >
        {

          item && item.map((dados) => (
            <SwiperSlide>

              <img src={url3 + dados.file} alt={url3 + dados.file} />

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
            
              <img src={url3 + dados.file} alt={url3 + dados.file} />
                 
            </SwiperSlide>
          ))
        }

       
      </Swiper>
    </>
  );
}
