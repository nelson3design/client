import React,{useEffect,useState,useContext} from "react";
import axios from "axios";
import HeaderCardapio from "./headerCardapio"
import "./style/cardapio.css"
import { Link } from "react-router-dom";
import Footer from "./footer";
import { CartContext } from "../context/context"
import { FaShoppingCart, FaSearchPlus, FaStar, FaRegStar } from "react-icons/fa";
import Cart from "./cart";
import { Oval } from 'react-loader-spinner'
import Comments from "./comments";
export default function Bebidas(){
  const [showModalComment, setShowModalComment] = useState(false)
  const [comments, setComments] = useState([])
  const { showProduct, setShowProduct,carts, handleAdd, handleCart } = useContext(CartContext)
  const [spinner, setSpinner] = useState(true)
  
     const [item, setItem] = useState([])
  const [view, setView] = useState("")


     const url ="https://server-4w73.onrender.com/bebidas"
     const url2 ="https://server-4w73.onrender.com/"
  const url3 = "https://server-4w73.onrender.com/product/comments/"
     useEffect(()=>{
  

        listItem()
         
      },[])

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

  


  function handleViewProduct() {
    setShowModalComment(false)
    setShowProduct(false)
localStorage.removeItem("idProduct")
  }
  function handleView(dados) {
    localStorage.setItem("idProduct", JSON.stringify(dados._id));
    setShowProduct(true)
    setView(dados)
  }
  useEffect(() => {


    listComment()

  }, [showProduct])

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

  const notas = comments.reduce((a, b) => Number(a + Number(b.note)), '')
  const qtyComment = comments.length
  const mediaValor = Number((notas / qtyComment).toFixed())

  const totalStars = 5;
  const activeStars = mediaValor;
  function handleComment() {
    setShowModalComment(true)
  }


  
    return(
      <>

        {
          showProduct ?
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
                        return index < activeStars ? <FaStar /> : <FaRegStar />;
                      })}
                      {
                        activeStars ? <span> {activeStars}/5 CLASSIFICAÇÃO | {qtyComment} AVALIAÇÕES</span> : null
                      }

                      <div className="description_view">{view.description}</div>
                      <div className="cardPreco">
                        <div className="preco">{view.event > 0 ? view.event + " x " : null} R$ {view.preco}</div>
                        <div className="btn btn_view" onClick={(e) => handleAdd(view)}><span>comprar</span></div>
                      </div>
                      {
                        view.event > 0 ? <div className="btnCart" onClick={handleCart}> ver carrinho</div> : null
                      }
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
                                return index < Number(items.note) ? <FaStar /> : <FaRegStar />;
                              })}
                            </div>


                            <div>{items.text}</div>
                            {
                              items.file ? <img width='30%' src={url2 + items.file} alt={url2 + items.file} /> : null

                            }
                          </div>
                        ))
                      }
                    </div>
                    <h2 className="btnComment" onClick={handleComment}>DEIXE SEU COMENTÁRIO</h2>
                  </div>


              }
            </div>
            : null
        }
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
           <HeaderCardapio/>

      <div className="linksBack">
         <div className="links">
        <ul className="linkContentBack">
          <li><a href="/cardapio">hambúrguer</a></li>
          <li><a href="/pizza">pizza</a></li>
          <li className="ativo"><a href="/bebidas">bebidas</a></li>
         
        </ul>
        </div>
   <section className="baseItens">

        {
              
              item && item.map((dados)=>(
               
                      
              <div className="cardBase">
                  <div className="cardImg" onClick={() => handleView(dados)}>
                    <div className="view_product"> <FaSearchPlus /></div>
                <img src={url2+dados.file} alt={url2+dados.file}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
                {/* <div className="texts">{dados.description.slice(0,50)+"..."}</div> */}
                 <div className="texts">{dados.description.length < "30" ? dados.description: dados.description.slice(0,60)+"..." }</div>
                <div className="cardPreco">
                      <div className="preco">{dados.event > 0 ? dados.event + " x " : null} R$ {dados.preco}</div>
                   
                        <div className="btn" onClick={(e) => handleAdd(dados)}><span>comprar</span></div>
                </div>
                    {
                      dados.event > 0 ? <div className="btnCart" onClick={handleCart}> ver carrinho</div> : null
                    }
                
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
}
        </>
    )
}
