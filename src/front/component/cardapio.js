import React,{useEffect,useState,useContext} from "react";
import axios from "axios";
import HeaderCardapio from "./headerCardapio"
import "./style/cardapio.css"
import { Link } from "react-router-dom";
import Footer from "./footer";
import { CartContext } from "../context/context"
import Cart from "./cart";
import { FaShoppingCart } from "react-icons/fa";


export default function Cardapio(){

  const { carts, handleAdd, handleCart } = useContext(CartContext)


     const [item, setItem] = useState([])
    const url="http://localhost:4000/hamburguer"
    const url2="http://localhost:4000/"

     useEffect(()=>{
  

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url}`).then((response) => {
            setItem(response.data);
            
        });
      }


    return(
        <>
           <HeaderCardapio/>

      <div className="linksBack">
         <div className="links">
        <ul className="linkContentBack">
          <li className="ativo"><a href="/cardapio">hambúrguer</a></li>
          <li><a href="/pizza">pizza</a></li>
          <li><a href="/bebidas">bebidas</a></li>
         
        </ul>
        </div>
   <section className="baseItens">

        {
              
              item && item.map((dados)=>(
               
                    
              <div className="cardBase">
            <div className="cardImg">
                <img src={url2+dados.file} alt={url2+dados.file}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
                {/* <div className="texts">{dados.description.slice(0,50)+"..."}</div> */}
                 <div className="texts">{dados.description.length < "30" ? dados.description: dados.description.slice(0,60)+"..." }</div>
                <div className="cardPreco">
                    <div className="preco">R$ {dados.preco}</div>
                   
                        <div className="btn" onClick={(e) => handleAdd(dados)}><span>comprar</span></div>
                </div>
                
            </div>

        </div>
               
       
            ))
              }
              </section>
              </div>

        <Cart />
        <Footer/>
        <div className="cartFloat">
          <div className="baseCartFloat" onClick={handleCart}>
            <div className="base_cart">
              <div className="cart_float"><FaShoppingCart className="cart_icon" /></div>
              <small className="count_float"><div className="cartLength">{carts.length}</div></small>
            </div>
          </div>
        </div>
        </>
    )
}