
import React,{useEffect,useState} from "react"
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
// import "./style/meusPedidos.css"
import { Oval } from 'react-loader-spinner'
export default function Login(){

    const [spinner, setSpinner] = useState(false)
    const [nome, setNome]=useState("nelson")
    const [password, setPassword]=useState("123456")

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
        setSpinner(true)
        e.preventDefault()
        let item = { nome, password }

        if (item.nome === "") {

            setNameError('o usuário é obrigatorio!')
            setSpinner(false)
        } else if (item.password === "") {

            setPasswordError('a Senha é obrigatorio!')
            setSpinner(false)
        }
        else {
            setNameError('')
            setPasswordError('')


            axios.post("https://server-4w73.onrender.com/admin/login", item)
                .then((res) => {
                    if (res.status == 200) {
                        setSpinner(false)
                       
                        localStorage.setItem("tokenAdmin", JSON.stringify(res.data.token));
                        localStorage.setItem("idAdmin", JSON.stringify(res.data.id));
                        navigate('/admin/dashboard')
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        setSpinner(false)
                     
                        setInvalid(error.response.data.msg)
                    }
                });
        }


    }


    return(
        <>
        {
            spinner?<div className = "spinner">< Oval
            ariaLabel = "loading-indicator"
    height = { 100}
    width = { 100}
    strokeWidth = { 5}
    strokeWidthSecondary = { 1}
    color = "green"
    secondaryColor = "white"
        /></div >
            :null}
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

        </>
    )
}