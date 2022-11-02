
import React,{useEffect,useState} from "react"
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
// import "./style/meusPedidos.css"

export default function Login(){

    
    const [nome, setNome]=useState("")
    const [password, setPassword]=useState("")

    const navigate = useNavigate();

  
    useEffect(()=>{
        if (localStorage.getItem('idAdmin')){
            navigate('/admin/dashboard')
        }

    },[])


    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [invalid, setInvalid] = useState('')

    function login(e) {
        e.preventDefault()
        let item = { nome, password }

        if (item.nome === "") {

            setNameError('o usuário é obrigatorio!')

        } else if (item.password === "") {

            setPasswordError('a Senha é obrigatorio!')

        }
        else {
            setNameError('')
            setPasswordError('')


            axios.post("https://server-4w73.onrender.com/admin/login", item)
                .then((res) => {
                    localStorage.setItem("tokenAdmin", JSON.stringify(res.data.token));
                    localStorage.setItem("idAdmin", JSON.stringify(res.data.id));
                    navigate('/admin/dashboard')
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data.msg);
                        setInvalid(error.response.data.msg)
                    }
                });
        }


    }


    return(
        <>
     

      <div className="linksBackPedidos">
         <div className="links">
            <div className="formPedidos">
            <div style={{textAlign:"center", fontSize:"50px", fontWeight:"800", textTransform:"uppercase",color:"red",marginBottom:"10px"}}>Menu</div>
                <div className="titlePedido">painel administrativo</div>
                <form onSubmit={login}>
                <div className="formItens">
                  <div>
                    <label>Usuário</label>
                    <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    <small className="error">{nameError}</small>
                   </div>
                <div>
                    <label>Senha</label>               
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <small className="error">{passwordError}</small>    
                </div>
                </div>
             
                            <small className="error">{invalid}</small>
                <input className="btnPedido" type="submit" value="entrar"/>
                </form>
            </div>

         </div>
         </div>

        
        
        </>
    )
}