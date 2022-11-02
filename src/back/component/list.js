
import React ,{useState,useEffect} from "react";
import Footer from "./footer";
import axios from 'axios'
import "../styles/list.css"
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { FaUserCircle,FaCaretDown } from "react-icons/fa";




function List(){
    const navigate = useNavigate();

    const [item, setItem] = useState([])
    const [value, setValue] = useState([])
     const [user, setUser] = useState([])

  const url ="https://server-4w73.onrender.com/"
 

    var idstring= localStorage.getItem("idAdmin")

  var idAdmin = JSON.parse(idstring)

  useEffect(()=>{
    if(localStorage.getItem("idAdmin")){
       navigate('/admin/dashboard')
    }else{
      navigate('/admin/login')
    }

},[])

  

  var idUser={
    id: idAdmin
  }

    useEffect(()=>{

        listItem()
      userAdmin()
         
      },[])

      const userAdmin=()=>{
        axios.post("https://server-4w73.onrender.com/admin/user", idUser).then((res) => {
            setUser(res.data.user);
            console.log(res.data)
            
        });
      }

      const listItem = () => {
        axios.get("https://server-4w73.onrender.com/").then((res) => {
          setItem(res.data);
          console.log(res.data)

        });
      }


const handleSearch= async (e)=>{
  e.preventDefault()
    return await axios 
      .get(`https://server-4w73.onrender.com/item/${value}`)
    .then((response)=>{
      console.log(response.data)
    setItem(response.data)

      setValue("")



    })
  
}


const handleRemove=(id)=>{
  console.log(id)
if(window.confirm('tem certeza de excluir esse usuáorio')){
  axios.get("https://server-4w73.onrender.com/delete/"+id).then((response) => {
        
        listItem()
        
    });
}
}


// paginação

const [itensPerPage, setItensPerPage]=useState(8)

const [currentPage, setCurrentPage]=useState(0)


const pages= Math.ceil(item.length / itensPerPage)
const startIndex= currentPage * itensPerPage
const endIndex= startIndex + itensPerPage
const currentItens = item.slice(startIndex,endIndex)



const [logout, setLogout]= useState(false)




if(logout){
  localStorage.removeItem("idAdmin")
  navigate('/admin/login')
}

const handlelogout =()=>{
  setLogout(true)
}



  const [profile , setProfile]= useState(false)

  let className='profileContentUser'

  if(!profile){
      className = "hideProfileContent"
  }


  const handleShow = ()=>{
    setProfile(!profile)
  }


    return(
      
        <>
        <div className="listas">

        <div className="listasContent container">

        <div className="infoClienteMobile">
     
     
            
            
              <div>

              <div className="profile profileUser">
              <div className="avatar"><FaUserCircle className="iconProfile"/> <span>{user.nome}</span></div> <FaCaretDown onClick={handleShow} style={{cursor: "pointer"}}/>
              </div>

               
               <div className={className}>
         
                <div className="profileItem"><div>Nome: </div><span>{user.nome}</span></div>
                
                 <div onClick={handlelogout} className="sair">Sair</div>
               </div>
            

               </div>
     
          
            
     </div>

        
        <div className="btnBarPes">
            <Link to="/admin/dashboard/create" className="btnAdd">Adicionar item</Link>

         <form className="formPes" onSubmit={handleSearch}>
            <input className="barText" type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
            <input type="submit" value="pesquisar" className="btnPes"/>
         </form>
        </div>

        
         <table border="0px" width="100%" className="table">
            <thead className="thead">
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Destaque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody className="tbody">

              
            {
              
              currentItens && currentItens.map((dados)=>(
                    
                     <tr key={dados.id}>  
                    <td data-label="Imagem"><img src={url+dados.file} width="60px" alt=""/></td>
                    <td className="Nome" data-label="Nome">{dados.nome}</td>
                    <td className="Description" data-label="Description">{dados.description.length < "30" ? dados.description: dados.description.slice(0,30)+"..."}</td>
                    <td data-label="Preço">{"R$ "+dados.preco}</td>
                    <td className="Categoria" data-label="Categoria">{dados.categoria}</td>
                    <td data-label="Destaque">{dados.destaque}</td>

                    <td data-label="Ações" className="action">
                        <Link to={`/admin/dashboard/update/${dados._id}`}>
                           <button className="btnAtion1 btnAtion">Editar</button>
                        </Link>
                
                       
                        <button onClick={()=>handleRemove(dados._id)} className="btnAtion2 btnAtion">Excluir</button>
                    </td>
                </tr>
            ))
          
            
            }
            </tbody>

        </table>

        <div className="paginationBase">
                    {Array.from(Array(pages), (itens, index)=>{
                        return <button style={ index == currentPage ? {background: "red",color:"white"}: null} value={index} onClick={(e)=>setCurrentPage(Number(e.target.value))}>{index + 1}</button>
                    })}
                </div>
        </div>
        </div>
        <Footer/>
        </>
    )

}

export default List