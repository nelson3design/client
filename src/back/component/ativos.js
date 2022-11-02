import React,{useEffect,useState} from "react";
import axios from "axios"
import HeaderPedido from "./headerPedido"
import { useNavigate } from 'react-router-dom';
import "../styles/links.css"

import "../styles/ativos.css"



export default function Ativos(){
    const navigate = useNavigate();

  const [order, setIOrder] = useState([])

  const url ="https://server-4w73.onrender.com/active"
  const url2 ="https://server-4w73.onrender.com/"

  useEffect(() => {
    if (localStorage.getItem("idAdmin")) {
     // navigate('/admin/andamento')
    } else {
      navigate('/admin/login')
    }
    listItem()
  
  }, [])


  const listItem=()=>{
    axios.get("https://server-4w73.onrender.com/order/ativo").then((response) => {
      setIOrder(response.data);
      console.log(response.data[0].costumer)
     
        
    });
  }





const handleConfirm=(_id)=>{
var id={
  id:_id
}
  
axios.post(url2+"confirmar/",id).then((response)=>{
  
  listItem()
})
}
   
const handleCancel=(_id)=>{
  var id = {
    id: _id
  }

axios.post(url2+"cancelar/",id).then((response)=>{
    
    listItem()
  })
}


    return(
        <>
        <HeaderPedido/>

        <div className="baseContent">

        <div className="links">
        <ul className="linkContent">
          <li className="ativo"><a href="/admin/dashboard/andamento">em aberto</a></li>
          <li><a href="/admin/dashboard/preparo">em preparo</a></li>
          <li><a href="/admin/dashboard/entrega">em entrega</a></li>
          <li><a href="/admin/dashboard/historico">históricos</a></li>
         
        </ul>
      </div>
       
      
      <section className="baseItens">

    
                <>
             

        <div className="order_base">
          <div className="order_content container">
            <div className="orders">
              {order.map((order, index) => (
                <div className="order_itens">
                  <div className="order_info">

              
                    <div className="order_title"> Numero do pedido: <span>#{order._id.slice(15, -1)}</span></div>
                    <div className="bar"></div>
                    <div>
                      
                     
                      <div className="order_title">Cliente: <span> {order.costumer}</span></div>
                      <div className="order_title">Data: <span> {order.data.slice(0, 10)}</span></div>
                      {order.pedido.map((pedido, index) => (

                        <div className="order_title">Valor Total: <span>R${pedido.valorTotal}</span></div>
                      ))}

                      <div className="bar"></div>
                      <div className="order_title">Item adicional </div>

                      {order.pedido.map((pedido, index) => (
                        pedido.itemAdicional.map((cart) => (
                          <>
                            <div className="order_title"><span>{cart.nome}</span></div>
                            <div className="order_title"><span>QTY: {cart.qty}</span></div>
                          </>
                        ))

                      ))}
                      <div className="bar"></div>
                    </div>
                    <div className="order_title">Endereço de entregar

                    </div>


                    <div className="order_adress">
                      {order.pedido.map((pedido, index) => (
                        pedido.entrega.map((cart) => (
                          <>
                            <div className="order_title">Rua: <span>{cart.rua}</span></div>
                            <div className="order_title">CEP: <span>{cart.cep}</span></div>
                            <div className="order_title">Numero: <span>{cart.numero}</span></div>
                            <div className="order_title">Complemento: <span>{cart.complemento}</span></div>
                            <div className="order_title">Bairro: <span>{cart.bairro}</span></div>
                            <div className="order_title">Cidade: <span>{cart.cidade}</span></div>
                            <div className="order_title">Estado: <span>{cart.estado}</span></div>

                          </>
                        ))

                      ))}
                    </div>

                    <div className="btns btn_order">
                      <div className="btns">
                        <button className="confirmar" onClick={() => handleConfirm(order._id)}>confirmar</button>
                        <button className="cancelar" onClick={() => handleCancel(order._id)}>cancelar</button>
                      </div>
                    </div>
                  </div>

                  <div className="order_item">
                    {order.pedido.map((pedido, index) => (
                      pedido.itemComprado.map((cart) => (
                        <>

                          <div className="cardBase">
                            <div className="cardImg">
                              <img src={url2 + cart.file} alt={url2 + cart.file} />
                              <h3>{cart.nome}</h3>

                            </div>

                            <div className="cardText">
                              <div className="texts">{cart.description.length < "30" ? cart.description : cart.description.slice(0, 60) + "..."}</div>
                              <div>Quantidade: {cart.qty}</div>
                              <div className="cardPreco">
                                <div className="preco">R$ {cart.preco}</div>

                              </div>
                            </div>
                          </div>
                        </>
                      ))

                    ))}

                  </div>

                </div>

              ))}

            </div>
          </div>
        </div>

        </>
            
     </section> 

        </div>
      
        </>
    )
}

