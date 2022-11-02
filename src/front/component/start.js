import { useState, useContext, useEffect } from "react";
import "./style/start.css"
import Header from "./header"
import Footer from "./footer"
import Slide from "./slide"
import Cart from "./cart"
import Carrossel from "./carrossel"
import { CartContext } from "../context/context"
import { FaShoppingCart } from "react-icons/fa";



export default function Start(){
    const { handleCart, carts } = useContext(CartContext)

    return(
        <>
         <Header/>
         <Slide/>
         <div className="cardContent">
            <div className="CardItens container">
            <h2 className="title">Cardapio do dia</h2>
            <Carrossel/>
            </div>
           
        </div>
          <Cart />
         <Footer/>
            <div className="cartFloat">
                <div className="baseCartFloat" onClick={handleCart}>
                    <div className="base_cart">
                        <div className="cart_float"><FaShoppingCart className="cart_icon"/></div>
                        <small className="count_float"><div className="cartLength">{carts.length}</div></small>
                    </div>
                </div>
            </div>
        </>
    )
}