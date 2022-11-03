import { useState, useContext, useEffect } from "react";
import "./style/header.css"
import { MdSearch, MdStarOutline,MdOutlineRestaurant } from "react-icons/md";
import { FaClipboardCheck, FaTimes, FaBars, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/context"

function Header(){



  const [item2, setItem2] = useState("")

  var idString = localStorage.getItem("id")

  var id = JSON.parse(idString)
  const url3 = "https://server-4w73.onrender.com/costumer"
  const url4 = "https://server-4w73.onrender.com/"


  var user=""
  var userName = ""
  if(idString){
    user = "hideUser"
    userName = "showUser"
  }else{
    user = "showUser"
    userName = "hideUser"
   
  }


  useEffect(() => {


    listItem()
   

  }, [])

  const data={
    id:id
  }

  const listItem = () => {

    axios.post("https://server-4w73.onrender.com/costumer",data).then((response) => {
      try {

        setItem2(response.data.user);
       
      } catch (error) {

      }


    });

  }

  const { handleCart,handleAdd, carts } = useContext(CartContext)



  const url ="https://server-4w73.onrender.com/"
    const [showBarra, setShowBarra] = useState(false)

    const [hamb, setHamb] = useState(true)
    const [times, setTimes] = useState(false)

    const handleHamb =()=>{
      setTimes(!times)
      setHamb(!hamb)
    }
    const handleTimes =()=>{
      setHamb(!hamb)
       setTimes(!times)
    }


    let className='barra'

    if(!showBarra){
        className = "hideBarra"
    }

    const handleSearch =()=>{
        setShowBarra(!showBarra)
    }
  const [item, setItem] = useState([])
    const [value, setValue] = useState([])

       const handleSearch2= async (e)=>{
        e.preventDefault()
         return await axios 
           .get(`https://server-4w73.onrender.com/item/${value}`)
         .then((response)=>{
         
      
            setValue("")
            if(value==""){
              setValue("")
            }else{
              setItem(response.data)
            }
      
         })
        
    }


    return(
      <>
      
        <header>
            <nav className="nav container">
                <a href="/" className="logo">menu</a>
                <div className="menuMobile">

                   <form className="formMobile" onSubmit={handleSearch2}>
                          
                           <input className="" type="search" value={value} onChange={(e)=>setValue(e.target.value)}/>

                           <span className="searchMobile" onClick={handleSearch2}><MdSearch className=""/></span>
                                                    
                        </form>

                </div>

                <div className="iconMobile">
                  {hamb? <FaBars onClick={handleHamb} className="iconM"/> : null}
                 {times?  <FaTimes onClick={handleTimes} className="iconM"/> : null}
                </div>

                <ul className="navlist">
                    <li>
                        <form className="form" onSubmit={handleSearch2}>
                           
                            <input className={className} type="search" value={value} onChange={(e)=>setValue(e.target.value)}/>
                            <div className="formContent" onClick={handleSearch}>
                           {showBarra ? null : <MdSearch className="iconSearch"/>   }

                            {showBarra ?  <span className="search" onClick={handleSearch2}>buscar</span> :  <span className="semBorder">buscar</span> }
                          
                            </div>
                        </form>
                    </li>

                    <li className="ative"><a href="/"><MdStarOutline className="star"/> <span>destaques</span></a></li>
                    <li><a href="/cardapio"><MdOutlineRestaurant/> <span>cardápio</span></a></li>
                  
                     <li><a href="/login"><FaUserAlt /> <small className={user}>Entrar</small><small className={userName} id="username">{item2.nome}</small></a></li>
                    <li><a><div className="baseCart" onClick={handleCart}><FaShoppingCart /> <small className="cartCount">{carts.length}</small></div></a></li>
                   
                    
             
                </ul>
            </nav>

            {times?
                <ul className="mobileLinks">
                  <li className="ative"><a href="/"><MdStarOutline className="star"/> <span>destaques</span></a></li>
                    <li><a href="/cardapio"><MdOutlineRestaurant/> <span>cardápio</span></a></li>
                  
              <li><a href="/login"><FaUserAlt /> <small className={user}>Entrar</small><small className={userName} id="username">{item2.nome}</small></a></li>
                 <li><a><div className="baseCart" onClick={handleCart}><FaShoppingCart /> <small className="cartCount">{carts.length}</small></div></a></li>

                </ul>
             : null}

           
        </header>
        <div className="formSearch">
            <div className="formSearchContent">
            {
              
              item && item.map((dados)=>(
                <div className="formResponse">
               
                      
              <div className="cardBase">
            <div className="cardImg">
                <img src={url+dados.file} alt={url+dados.file}/>
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
                
       </div>
            ))
              }
              </div>
        </div>
       
       


       
      </>
    )
}

export default Header
