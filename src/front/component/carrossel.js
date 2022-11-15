import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style/card.css"
import { FaSearchPlus, FaStar, FaRegStar } from "react-icons/fa";

import { Link } from "react-router-dom";
import Comments from "./comments";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style/carrossel.css";
import { Oval } from 'react-loader-spinner'
// import required modules

import {CartContext} from "../context/context"

import { Navigation, Pagination, Mousewheel, Keyboard,Autoplay, FreeMode } from "swiper";



export default function Carrossel() {

  const { showProduct, setShowProduct,carts, sowCarrinho, handleAdd, handleCart } = useContext(CartContext)
  const [spinner, setSpinner] = useState(true)

  const [item, setItem] = useState([])
  const [view, setView] = useState("")

 
  const [done, setDone] = useState([])
  const url ="https://server-4w73.onrender.com/destaque"
  const url2 ="https://server-4w73.onrender.com/"
  const url3 = "https://server-4w73.onrender.com/product/comments/"
 
    useEffect(()=>{
        listItem()
        
      },[])
  useEffect(() => {
   
      listComment()
  }, [showProduct])
     

      const listItem=()=>{
        axios.get(`${url}`).then((response) => {
            
          if (response.status == 200) {
            setSpinner(false)
    
            const arr = response.data
            var data = arr.map(obj => ({ ...obj, event: 0 }))
            setItem(data);
          }
         
        });
       
      }
      
     
     
  const [showModalComment, setShowModalComment] = useState(false)
  const [comments, setComments] = useState([])

  function handleViewProduct(){
    setShowProduct(false)
    setShowModalComment(false)
  }

  function handleView(dados){
    localStorage.setItem("idProduct", JSON.stringify(dados._id));
    setShowProduct(true)
     setView(dados)
  }

  var idString = localStorage.getItem("idProduct")
  var idProduct = JSON.parse(idString)

  const listComment = () => {
    axios.post(`${url3}${idProduct}`).then((response) => {
      if (response.status == 200) {
        setComments(response.data)
        console.log(response.data);
      }

    });

  }

 
 
  const notas = comments.reduce((a, b) => Number(a + Number(b.note)),'')
  const qtyComment = comments.length
  const mediaValor = Number((notas/qtyComment).toFixed())

  const totalStars = 5;
  const activeStars = mediaValor;

  function handleComment(){
    setShowModalComment(true)
  }

   
  return (
    <>
    {
      showProduct?
          <div className="view_product_base">
            <div className="close_modal" onClick={handleViewProduct}>&ensp;</div>
           
            {
              showModalComment ?
                <div className="view">
                  <Comments />
                </div> 
               :
                <div className="view">

                  <div className="view_img"><img src={url2 + view.file} alt={url2 + view.file} /></div>
                  <div className="view_info">
                    <div className="title_view">{view.nome}</div>
                 
                    {[...new Array(totalStars)].map((arr, index) => {
                      return index < activeStars ? <FaStar /> : <FaRegStar/>;
                    })}
                     {
                      activeStars ? <span> {activeStars}/5 CLASSIFICAÇÃO | {qtyComment} AVALIAÇÕES</span>:null
                     }

                    <div className="description_view">{view.description}</div>
                    <div className="cardPreco">
                      <div className="preco">{view.event > 0 ? view.event + " x " : null} R$ {view.preco}</div>
                      <div className="btn btn_view" onClick={(e) => handleAdd(view)}><span>comprar</span></div>
                    </div>
                    {
                      view.event > 0 ? <div className="btnCart" onClick={handleCart}> ver carrinho</div> : null
                    }

                    <div>
                    </div>
                    <div>
                      <div className="note">AVALIAÇÕES</div>
                      {
                        comments.map((items) => (
                          <div className="commentContent">
                            <div className="nome">{items.nome}</div>
                            <small>{items.email}</small>
                           <div>
                              {[...new Array(totalStars)].map((arr, index) => {
                                return index < Number(items.note) ? <FaStar />: <FaRegStar />;
                              })}
                           </div>
                         
                           
                            <div>{items.text}</div>
                            {
                              items.file ? <img width='30%' src={url2 + items.file} alt={url2 + items.file} />:null

                            }
                          </div>
                        ))
                      }
                    </div>
                    <h2 className="btnComment" onClick={handleComment}>DEIXE SEU COMENTÁRIO</h2>
                  </div>
                </div> 
            }
            
          </div>
          :null
    }
      
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
          delay: 5000,
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
         modules={[Navigation, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"

        
      >
       

         {
              
              item && item.map((dados)=>(
                <SwiperSlide>
                     
            <div className="cardBase">
                <div className="cardImg" onClick={()=>handleView(dados)}>
                      <div className="view_product"> <FaSearchPlus /></div>
                    <img src={url2+dados.file} alt={url2+dados.file}/>
                    <h3>{dados.nome}</h3>

                </div>

                <div className="cardText">               
                    <div className="texts">{dados.description.length < "20" ? dados.description: dados.description.slice(0,20)+"..." }</div>
                    <div className="cardPreco">
                        <div className="preco">{dados.event>0? dados.event+" x " :null} R$ {dados.preco}</div>
                      <div className="btn" onClick={(e) => handleAdd(dados)}><span>comprar</span></div>
                    </div>
                       {
                        dados.event >0 ? <div className="btnCart" onClick={handleCart}> ver carrinho</div> :null
                       }           
                      
                </div>
             </div>
                
        </SwiperSlide>
            ))
              
       }
      </Swiper>
  
    </>
  );
}
