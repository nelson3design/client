import React,{useEffect,useState,useRef} from "react";
import axios from "axios";
import HeaderPedido from "./headerPedido"
import { MdDone } from "react-icons/md";
import Footer from "./footer";
import { ThreeDots } from  'react-loader-spinner'
import "./style/pedido.css"
import { FaUserCircle, FaCaretDown, FaAngleRight, FaAngleDown } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import Cart from "./cart";
import "./style/order.css"


export default function Pedido(){

  const navigate = useNavigate();

  var idString= localStorage.getItem("id")

  var id = JSON.parse(idString)
  

  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate('/pedido')
    } else {
      navigate('/login')
    }


  }, [])

  
const handlelogout =()=>{
  localStorage.removeItem("token")
 localStorage.removeItem("id")
  localStorage.removeItem("emailCliente")
 localStorage.removeItem("idCliente")
  localStorage.removeItem("costumer")
 // window.location.reload();
  navigate('/login')
}

   
  const [profile , setProfile]= useState(false)

  let className='profileContent'

  if(!profile){
      className = "hideProfileContent"
  }


  const handleShow = ()=>{
    setProfile(!profile)
  }


const [item, setItem] = useState([])
const [item2, setItem2] = useState("")

  const url ="https://server-4w73.onrender.com/costumer"
  const url2 ="https://server-4w73.onrender.com/"
  const ref = useRef(null);

useEffect(()=>{


   listItem()
  orders()
 

 },[])

 const data={
  id:id
 }

 
  const listItem=()=>{
  

    axios.post("https://server-4w73.onrender.com/costumer",data).then((response) => {
        try {
          setItem(response.data.user);
          setItem2(response.data.user.endereco[0]);
          navigate('/pedido')
        } catch (error) {
          navigate('/login')
        }
        
      });
    
  }
 

  
// lista pedidos
  const [order, setorder] = useState([])
  const [order2, setorder2] = useState([])

  const orders = () => {
  
    axios.get("https://server-4w73.onrender.com/costumer/order/" + id).then((response) => {
      try {
        setorder(response.data.order);
         console.log(response.data.order)
       
      } catch (error) {
        
      }
    });

  }
//console.log(order)






  const handleCancel = (order) => {
    var id = {
      id: order._id
    }

    axios.post(url2 + "cancelar/", id).then((response) => {

      orders()
    })
  }



 
 

    return(

       <>
        

        <HeaderPedido/>
       
       <div className="baseContent">

        <div className="links pedidoBase1">



       <div className="infoCliente">
     
       
                <div>

                <div className="profile">
                  <div className="avatar"><FaUserCircle className="iconProfile" /> <span>{item.nome}</span></div> <FaCaretDown onClick={handleShow} style={{cursor: "pointer"}}/>
                </div>

               
              
                 
                 <div className={className}>

                
                  <div className="profileItem"><div>Nome: </div><span>{item.nome}</span></div>
                  <div className="profileItem"><div>Email: </div><span>{item.email}</span></div>
                  <div className="profileItem"><div>Cpf: </div><span>{item.cpf}</span></div>
                  <div className="profileItem"><div>Cep: </div><span>{item2.cep}</span></div>
                  <div className="profileItem"><div>Rua: </div><span>{item2.rua}</span></div>
                  <div className="profileItem"><div>Numero: </div><span> {item2.numero}</span></div>
                  <div className="profileItem"><div>Bairro: </div><span>{item2.bairro}</span></div>
                  <div className="profileItem"><div>Cidade: </div><span>{item2.cidade}</span></div>
                  <div className="profileItem"><div>Estado: </div><span>{item2.estado}</span></div>
                  <div className="profileItem"><div>Complemneto: </div><span>{item2.complemento}</span></div>
                   <div onClick={handlelogout} className="sair">Sair</div>
                 </div>
              

                 </div>
       
          
       </div>
            
  <div className="order_base">
    <div className="order_content container">
    <div className="orders">
      {order.map((order, index) => (
        <div className="order_itens">

        <div className="order_info">
            <div className="order_title"> Numero do pedido: <span>#{order._id.slice(15, -1)}</span></div>
            <div className="bar"></div>
            <div>
              {order.confirmar === "off" && order.cancelar =="off" ? <div className="order_title">Pedido processando: <span><ThreeDots color="green" height={30} width={30} /></span></div> : null}
              {order.confirmar === "on" ? <div className="order_title">Confirmado: <MdDone /></div> : null}
              {order.confirmar === "off" && order.cancelar === "on" ? <div className="order_title">Cancelado: <MdDone /></div> : null}
              {order.preparar === "on" && order.terminar === "off" ? <div className="order_title">Preparando: <span><ThreeDots color="green" height={30} width={30} /></span></div> : null}
              {order.preparar === "on" && order.terminar === "on" && order.entregar === "off" ? <div className="order_title">Preparado: <span><MdDone /></span></div> : null}
              {order.terminar === "on" && order.entregar === "on" && order.finalizar === "off" ? <div className="order_title">Pedido a caminho: <span><ThreeDots color="green" height={30} width={30} /></span></div> : null}
              {order.terminar === "on" && order.entregar === "on" && order.finalizar === "on" ? <div className="order_title">Pedido concluido: <MdDone /></div> : null}
              
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
            </div>
            <div className="bar"></div>
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
              {order.confirmar == "off" && order.cancelar == "off" ? <button className="cancelar" onClick={() => handleCancel(order)}>cancelar</button> :
                <button className="cancelado" >cancelado</button>
              }
            </div>
        </div>

        <div className="order_item">
          { order.pedido.map((pedido, index) => (
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
     
</div>
</div>

        <Cart />
<Footer/>

       </>
    )
}