




import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext({})



export const CartProvider = ({ children }) => {

    const [showCart, setShowCart] = useState(false)

    var show
    var showBase

    if (showCart == false) {
        show = "off"
        showBase ="sideContainerOff"
    } else {
        show = "one"
        showBase = "sideContainerOn"
    }

    function handleCart() {
        setShowCart(true)

    }
    function handleClose() {
        setShowCart(false)
    }



   
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')

    const [carts, setCarts] = useState(cartFromLocalStorage)



    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(carts))
    }, [carts])



    function handleRemove(_id) {


        const filterItem = carts.filter(index => index._id !== _id)
        setCarts(filterItem)


    }

    const total = carts.reduce((a, b) => a + b.preco * b.qty, 0)




    function handleAdd(dados) {

        const exist = carts.find((x) => x._id === dados._id)
        if (exist) {

            setCarts(
                carts.map((x) =>
                    x._id === dados._id ? { ...exist, qty: exist.qty + 1 } : x
                )
            )

        } else {
            setCarts([...carts, { ...dados, qty: 1 }])
        }
       

    }

    function handleDelete(dados) {
        const exist = carts.find((x) => x._id === dados._id)
        if (exist.qty === 1) {

            setCarts(carts.filter((x) => x._id !== dados._id))

        } else {
            setCarts(
                carts.map((x) =>
                    x._id === dados._id ? { ...exist, qty: exist.qty - 1 } : x
                )
            )
        }
    }






    return (
        <CartContext.Provider value={{ carts, total, handleRemove, handleAdd, showCart, show, handleCart, handleClose, handleDelete, showBase }}>
            {children}
        </CartContext.Provider>
    )
}

