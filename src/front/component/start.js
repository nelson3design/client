import { useState, useContext, useEffect } from "react";
import "./style/start.css"
import Header from "./header"
import Footer from "./footer"
import Slide from "./slide"
import Cart from "./cart"
import Carrossel from "./carrossel"
import { CartContext } from "../context/context"
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { Oval } from 'react-loader-spinner'

export default function Start(){
    const { handleCart, carts } = useContext(CartContext)

    const [spinner, setSpinner] = useState(true)

    const url = "https://server-4w73.onrender.com/"

    useEffect(() => {

        listItem()

    }, [])

    const listItem = () => {
        axios.get(`${url}`).then((response) => {
            if (response.status == 200) {
                setSpinner(false)
            }

        });
       
    }

   

    return(
       
       
        <>
            {
                spinner ? <div className="spinner"><Oval
                    ariaLabel="loading-indicator"
                    height={100}
                    width={100}
                    strokeWidth={5}
                    strokeWidthSecondary={1}
                    color="red"
                    secondaryColor="white"
                /></div>
            :
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
             }
        </>
    )
}