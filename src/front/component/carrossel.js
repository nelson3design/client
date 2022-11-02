import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style/card.css"

import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style/carrossel.css";

// import required modules

import {CartContext} from "../context/context"

import { Navigation, Pagination, Mousewheel, Keyboard,Autoplay, FreeMode } from "swiper";

export default function Carrossel() {

  const { carts, handleAdd, handleCart } = useContext(CartContext)

  const [item, setItem] = useState([])
    const url="http://localhost:4000/destaque"
    const url2="http://localhost:4000/"

    useEffect(()=>{
  

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url}`).then((response) => {
            setItem(response.data);
            
        });
      }

   
  return (
    <>
      <Swiper
        
        // slidesPerView={4}
        // spaceBetween={5}
        slidesPerGroup={1}
        loop={true}
  
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
         autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      breakpoints={{
    
    0: {
       slidesPerView:1,
       spaceBetween: 10,
    },
     480: {
       slidesPerView:2,
       spaceBetween: 10,
    },
     768: {
       slidesPerView:3,
       spaceBetween: 10,
    },
     1024: {
       slidesPerView:4,
       spaceBetween: 10,
    }
    ,
     1600: {
       slidesPerView:5,
       spaceBetween: 10,
    }
   
  }}
        
        navigation={false}
         modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"

        
      >
       

         {
              
              item && item.map((dados)=>(
                <SwiperSlide>
                      {/* <Link to={`/comprar/${dados.id}`} style={{textDecoration: "none"}} className="linkHover"> */}
            <div className="cardBase">
                <div className="cardImg">
                    <img src={url2+dados.file} alt={url2+dados.file}/>
                    <h3>{dados.nome}</h3>

                </div>

                <div className="cardText">               
                    <div className="texts">{dados.description.length < "30" ? dados.description: dados.description.slice(0,60)+"..." }</div>
                    <div className="cardPreco">
                      <div className="preco">R$ {dados.preco}</div>
                      <div className="btn" onClick={(e) => handleAdd(dados)}><span>comprar</span></div>
                    </div>               
                </div>
             </div>
                {/* </Link> */}
        </SwiperSlide>
            ))
              }
       
      </Swiper>
    </>
  );
}