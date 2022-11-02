
import "./style/cart.css"

import { useContext, useState } from "react"
import { CartContext } from "../context/context"

export default function Cart(props) {

    const { carts, total, handleRemove, show, handleClose, showCart, handleAdd, handleDelete,showBase } = useContext(CartContext)
    const url2 = "http://localhost:4000/"


    const listCart = new Map()

    carts.forEach((el) => {
        if (!listCart.has(el.id)) {
            listCart.set(el.id, el)
          
        }
       
    })

    const data = [...listCart.values()]
  


    return (
   <>
        <div className={showBase} onClick={handleClose}>
             </div>
            <div className="side" id={show}>
                {showCart ? <div className="close" onClick={handleClose}> x </div> : null}

                {
                    carts.length === 0 ? <div>Nenhum produto no carrinho.</div>
                        :

                        <div>
                            {
                                carts.map((data) => (


                                    <div className="sideItem" key={data.id}>
                                        <img className="img" src={url2 + data.file} />
                                        <div className="name">{data.nome}</div>
                                        <div className="preco">{data.qty} x {data.preco}</div>
                                        <div><button onClick={(e) => handleDelete(data)}>-</button> <button onClick={(e) => handleAdd(data)}>+</button></div>
                                        <button onClick={(e) => handleRemove(data._id)}>Remover item</button>

                                    </div>


                                ))
                            }
                           

                          
                            <div className="cartPrecoTotal">
                                {carts.length > 0 ? <div className="preco">Total: R$ {total.toFixed(2)}</div> : null}

                                <a href="/comprar/"> <button className="finalizarComprar">Finalizar compra</button></a>
                            </div>

                        </div>

                }
            </div>
        </>
       
    )
}

