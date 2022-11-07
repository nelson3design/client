import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CartContext } from "../context/context"
import HeaderCardapio from "./headerCardapio"
import { Oval } from 'react-loader-spinner'
import "./style/compra.css"
import Footer from './footer';
import { MdDownloadDone } from 'react-icons/md';
import Cart from "./cart";
export default function Compra(){
  const [spinner, setSpinner] = useState(false)
  const { carts, handleDelete, handleAdd, total } = useContext(CartContext)
 
  const navigate = useNavigate();

  const [logIn, setLogIn] = useState(true)
  const [logOut, setLogOut] = useState(false)

  function handleLogin() {
    setLogIn(false)
    setLogOut(true)
  }
  function handleLogout() {
    setLogIn(true)
    setLogOut(false)
  }
  
  if(total <= 0){
    navigate('/')
  }
    // verificar login

  var idString = localStorage.getItem("emailCliente")

  var emailCliente = JSON.parse(idString)
  

  var userOrder = ''
  var userLogin = ''

  if (localStorage.getItem("emailCliente")) {
    userOrder = 'showUserOrder'
    userLogin = 'hideUserOrder'
  } else {
    userOrder = 'hideUserOrder'
    userLogin = 'showUserOrder'
  }




  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [telefone, setTelefone] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState(false)


  // register customer
  const userInfos = {
    email: email,
    nome: nome,
    cpf: cpf,
    cep: cep,
    rua: rua,
    numero: numero,
    complemento: complemento,
    telefone: telefone,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    password: password,
    confirmPassword: confirmPassword
  }


  const handleSubmit2 = ((e) => {
    e.preventDefault()
    setSpinner(true)
    axios.post("https://server-4w73.onrender.com/register", userInfos)
    .then((res) => {

      if (res.status == 201) {
        setSpinner(false)
        localStorage.setItem("emailCliente", JSON.stringify(userInfos.email));
        localStorage.setItem("costumer", JSON.stringify(userInfos.nome));
        navigate('/comprar')
      }
    })
    .catch((error)=>{
      if (error.response) {
        setSpinner(false)
        setInvalid(error.response.data.msg)
      }
    });
  })



    fetch(`https://viacep.com.br//ws/${cep}/json/`)
      .then(response => response.json())
      .then(res => {
        setCep(res.cep)
        setRua(res.logradouro)
        setBairro(res.bairro)
        setCidade(res.localidade)
        setEstado(res.uf)
  
      })
  
   
// customer login
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [invalid, setInvalid] = useState('')

  function btnLogin(e) {
    setSpinner(true)
    e.preventDefault()
    let item = { email, password }
    if (item.email === "") {

      setEmailError('o Email é obrigatorio!')
      setSpinner(false)

    } else if (item.password === "") {

      setPasswordError('a Senha é obrigatorio!')
      setSpinner(false)

    }else{

      axios.post("https://server-4w73.onrender.com/login", item)
        .then((res) => {
          if (res.status == 200) {
            setSpinner(false)

            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("id", JSON.stringify(res.data.id));
            localStorage.setItem("emailCliente", JSON.stringify(item.email));
            localStorage.setItem("costumer", JSON.stringify(res.data.nome));
            navigate('/comprar')
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



    //fim verificar login
 
    const [cepIn, setCepIn] = useState("")
    const [ruaIn, setRuaIn] = useState("")
    const [numeroIn, setNumeroIn] = useState("")
    const [bairroIn, setBairroIn] = useState("")
    const [cidadeIn, setCidadeIn] = useState("")
    const [estadoIn, setEstadoIn] = useState("")
    const [complementoIn, setComplementoIn] = useState("")
 

    const [valor, setValor] = useState("")
  
  const [beb, setBeb] = useState([])
  const [ad, setAd] = useState([])

  const totalAdd = ad.reduce((a, b) => a + b.preco * b.qty, 0)

 
   
useEffect(()=>{
  getId()
},[])



 

   fetch(`https://viacep.com.br//ws/${cepIn}/json/`)
     .then(response => response.json())
     .then(res => {
       setCepIn(res.cep)
       setRuaIn(res.logradouro)
       setBairroIn(res.bairro)
       setCidadeIn(res.localidade)
       setEstadoIn(res.uf)

     })

 
const valorTotal = Number(total + totalAdd).toFixed(2)

const itemComprado = carts
const itemAdicional =ad

// data customer login
const [customer, setCustomer ] = useState("")
  
const getId=(()=>{
  axios.get("https://server-4w73.onrender.com/email/" + emailCliente).then((res) => {
    try {
      localStorage.setItem("idCliente", JSON.stringify(res.data.user._id));
      setCustomer(res.data.user.nome)
     // window.location.reload();
    } catch (error) {
    }
  });
})

 
   
  
    
const {id} =useParams()

var idClienteString= localStorage.getItem("idCliente")
var costumerString = localStorage.getItem("costumer")

var idCliente = JSON.parse(idClienteString)
var costumer = JSON.parse(costumerString)
   
 // fazer comprar
  const data = {
    costumer: costumer,
    idCliente: idCliente,
    status: "pago",
    itemComprado: itemComprado,
    itemAdicional: itemAdicional,
    valorTotal: valorTotal,
    cep: cepIn,
    rua: ruaIn,
    numero: numeroIn,
    complemento: complementoIn,
    bairro: bairroIn,
    cidade: cidadeIn,
    estado: estadoIn,

  }

const handleSubmit=((e)=>{
    e.preventDefault()
  setSpinner(true)
  axios.post("https://server-4w73.onrender.com/order", data).then((res) => {
   

      if (res.status === 200) {
        setSpinner(false)
       // localStorage.removeItem("cart")
        navigate('/obrigado')
      }

    });
    
});
    
  
  


    const [item, setItem] = useState([])
    const url="http://localhost:5000/product/"
  const url2 ="https://server-4w73.onrender.com/"


     
    useEffect(()=>{
  
        listItem()
        listBebida()


      },[])

      const listItem=()=>{
        axios.get(`${url}${id}`).then((response) => {
            // setItem(response.data);
            
        });

      }

 
 

  const url3 ="https://server-4w73.onrender.com/bebidas"
     
  
        const listBebida=()=>{
          axios.get(`${url3}`).then((response) => {
            //setBeb(response.data);
            //console.log(response.data)
            const arr = response.data
            var data = arr.map(obj => ({ ...obj, qty: 0 }))
            setBeb(data);
          });
        }

   const [count ,setCount]=useState("0")

  

  function handlePlus(dados) {
    setCount(dados.qty ++)
    
    const exist = ad.find((x) => x._id === dados._id)
    if (exist) {

      setAd(
        ad.map((x) =>
          x._id === dados._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      )

    } else {
      setAd([...ad, { ...dados, qty: 1 }])
    }
  }



  function handleMenos(dados){
    setCount(dados.qty--)
    const exist = ad.find((x) => x._id === dados._id)
    if (exist) {

      setAd(
        ad.map((x) =>
          x._id === dados._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      )

    }

    if(dados.qty <=0){

      const filterItem = ad.filter(index => index._id !== dados._id)
      setAd(filterItem)
    }
  }
  
 

 
 
    return(
        <>
        <HeaderCardapio/>
       
       
        {/* section login  */}

        
        <section id={userLogin}>

          <div className="linksBackPedidos">
            <div className="linksLogin">
           
               
               
              {
                logIn ?
                <>
                    {
                      spinner ? <div className="spinner">< Oval
                        ariaLabel="loading-indicator"
                        height={100}
                        width={100}
                        strokeWidth={5}
                        strokeWidthSecondary={1}
                        color="green"
                        secondaryColor="white"
                      /></div >
                        : null}

              <div className="formPedidos">
                <div className="titlePedido">Entrar com e-mail e senha</div>
                <form onSubmit={btnLogin}>
                  <div className="formItens">
                    <div>
                      <label>Email</label>
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <small className="error">{emailError}</small>
                    </div>
                    <div>
                      <label>Senha</label>
                      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <small className="error">{passwordError}</small>    
                    </div>
                  </div>

                        <small className="error">{invalid}</small>
                  <input className="btnPedido" type="submit" value="login" />
                </form>
                <span className="login_info" onClick={handleLogin}>Não tem uma conta? Cadastre-se</span>
              </div>
                  </>
                  : null
              }

              {
                logOut ?
                <>
                  {
                    spinner?<div className = "spinner">< Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={1}
              color="green"
              secondaryColor="white"
            /></div >
              : null}

              <div className="formPedidos">
                <div className="titlePedido">QUERO ME CADASTRAR</div>
                {error && <div style={{ color: "red" }}>cliente já tem cadastro</div>}
                <form onSubmit={handleSubmit2}>
                  <div className="formItens">

                    <div className="formItens">
                      <div>
                        <label>Nome</label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" required />
                      </div>
                      <div>
                        <label>E-mail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                      </div>
                    </div>

                  </div>
                  <div className="formItens">
                    <div>
                      <label>Cpf</label>
                      <input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="cpf" />
                    </div>
                    <div>
                      <label>Telefone</label>
                      <input type="number" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="telefone" required />
                    </div>

                  </div>

                  <div className='formInput'>
                    <div className='compraFormContent'>
                      <label>Cep</label>
                      <input value={cep} onChange={(e) => setCep(e.target.value)} placeholder="88137624" required />
                    </div>

                    <div className='compraFormContent'>
                      <label>Rua</label>
                      <input value={rua} onChange={(e) => setRua(e.target.value)} placeholder="rua jão vitor" required />
                    </div>
                  </div>

                  <div className='formInput'>
                    <div className='compraFormContent'>
                      <label>Bairro</label>
                      <input value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="bela vista" required />
                    </div>


                    <div className='formInput'>
                      <div className='compraFormContent numerInput1'>
                        <label>Numero</label>
                        <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="65" required />
                      </div>

                      <div className='compraFormContent numerInput2'>
                        <label>Complemento</label>
                        <input value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="apto 2" required />
                      </div>
                    </div>
                  </div>
                  <div className='formInput'>
                    <div className='compraFormContent'>
                      <label>Cidade</label>
                      <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="palhoça" required />
                    </div>


                    <div className='formInput'>
                      <div className='compraFormContent numerInput1'>
                        <label>Estado</label>
                            <select value={estado} onChange={(e) => setEstado(e.target.value)} className="select">
                              <option value="">Escolhe um estado</option>
                              <option value="AC">Acre</option>
                              <option value="AL">Alagoas</option>
                              <option value="AP">Amapá</option>
                              <option value="AM">Amazonas</option>
                              <option value="BA">Bahia</option>
                              <option value="CE">Ceará</option>
                              <option value="ES">Espírito Santo</option>
                              <option value="GO">Goiás</option>
                              <option value="MA">Maranhão</option>
                              <option value="MT">Mato Grosso</option>
                              <option value="MS">Mato Grosso do Sul</option>
                              <option value="MG">Minas Gerais</option>
                              <option value="PA">Pará</option>
                              <option value="PB">Paraíba</option>
                              <option value="PR">Paraná</option>
                              <option value="PE">Pernambuco</option>
                              <option value="PI">Piauí</option>
                              <option value="RJ">Rio de Janeiro</option>
                              <option value="RN">Rio Grande do Norte</option>
                              <option value="RS">Rio Grande do Sul</option>
                              <option value="RO">Rondônia</option>
                              <option value="RR">Roraima</option>
                              <option value="SC">Santa Catarina</option>
                              <option value="SP">São Paulo</option>
                              <option value="SE">Sergipe</option>
                              <option value="TO">Tocantins</option>
                              <option value="DF">Distrito Federal</option>

                        </select>
                      </div>


                    </div>
                  </div>
                        <small className="error">{invalid}</small>
                  <div className="formItens">
                    <div>
                      <label>Crie sua Senha de acesso</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                      <label>Digite novamente</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                  </div>


                  <input className="btnPedido" type="submit" value="cadastre-se" />
                </form>
                <span className="login_info" onClick={handleLogout}>Entrar com e-mail e senha</span>
              </div>
                  </>
                  : null
              }

            </div>
          </div>
        </section>
        
        {/* section checkout  */}

<section className='compraBases' id={userOrder}>
          {
            spinner ? <div className="spinner">< Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={1}
              color="green"
              secondaryColor="white"
            /></div >
              : null}
         
          {
            customer !== "" ? <small className='username'>Olá {customer}</small> : null
          }
      <div className='compraContent'>

      <div className='compraForm'>

         <form onSubmit={handleSubmit} className="formabase1">
          <div className='formdados'>
          <h2>ENDEREÇO DE ENTREGA</h2>
      <div className='formInput'>
      <div className='compraFormContent'>
        <label>Cep</label>   
          <input value={cepIn} onChange={(e) => setCepIn(e.target.value)} placeholder="88131740" required/>
       </div>
                    
       <div className='compraFormContent'>
       <label>Rua</label>
          <input value={ruaIn} onChange={(e) => setRuaIn(e.target.value)} placeholder="rua caraúna" required/>
       </div>

      </div>
        
     <div className='formInput'>
     <div className='compraFormContent'>
        <label>Bairro</label>
        <input value={bairroIn} onChange={(e)=>setBairroIn(e.target.value)} placeholder="bela vista" required/>
      </div>
        
       <div className='compraFormContent'>
       <label>Cidade</label>
        <input value={cidadeIn} onChange={(e)=>setCidadeIn(e.target.value)} placeholder="palhoça" required/>
       </div>
     </div>
       
     <div className='formInput'>
     <div className='compraFormContent'>
                      <label>Estado</label>
                      <select value={estadoIn} onChange={(e) => setEstadoIn(e.target.value)} className="select">
                        <option value="">Escolhe um estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                        <option value="DF">Distrito Federal</option>

                      </select>
      </div>
       

      <div  className='formInput'>
      <div className='compraFormContent numerInput1'>
        <label>Numero</label>
        <input value={numeroIn} onChange={(e)=>setNumeroIn(e.target.value)} placeholder="65" required/>
      </div>
       
        <div className='compraFormContent numerInput2'>
        <label>Complemento</label>
        <input value={complementoIn} onChange={(e)=>setComplementoIn(e.target.value)} placeholder="apto 2" required/>
        </div>
      </div>
     </div>

     {/* card-cartao */}
     <div className='pagamento'>
      <span className='aviso'>*Não precisa adicionar dados do seu cartão</span>
      <div className='titlePagamento'>pagamento</div>
      <div className='aviso'>Preencha os dados do seu Cartão</div>

      <div className='pagamentoInput'>
        <label>Número do Cartão</label>
        <input type="text"/>
      </div>

      <div className='pagamentoInput'>
        <label>Nome do Titular do Cartão</label>
        <input type="text"/>
      </div>

      <div className='pagamentoInput2'>
      <div className='pagamentoInput'>
        <label>Vencimento</label>
        <input type="text"/>
      </div>
      <div className='pagamentoInput'>
        <label>Código de segurança</label>
        <input type="text"/>
      </div>

      </div>

     </div>
      
     </div> 


   {/* adicinal item */}
       
      
        <div className='formdados dados2'>

        <input type="submit" className="btnFormCompra" value="Pagar agora"/>
        </div>
      
       
    </form>

    </div>

            {/* remumo do pedido */}
<div className='resumo'>
    <div className=''>

      <div className='titleCompra'>RESUMO DO PEDIDO</div>

    <div className="infoCompra">
                <div className='infoCompraItems'>
                  {


                    carts && carts.map((dados) => (

                      <div className="cardBaseCompra">
                        <div className="cardImgCompra" key={dados.idPedido}>
                          <img src={url2 + dados.file} alt={url2 + dados.file} />
                          <h3>{dados.nome}</h3>

                        </div>

                        <div className="cardTextCompra">
                          <input type="hidden" value={valor} onChange={(e) => setValor(e.target.value)} />
                          <div className="texts">{dados.description.slice(0, 40) + "..."}</div>
                          <div className="cardPrecoCompra">
                          

                            <input type="hidden" value={valor === "" ? setValor(Number(dados.preco)) : null} onChange={(e) => setValor(e.target.value)} />

                            <div className="precoCompra">{dados.qty} <span className="por"> x </span> R$ {dados.preco}</div>
                            <div><button onClick={(e) => handleDelete(dados)}>-</button> <button onClick={(e) => handleAdd(dados)}>+</button></div>
                          </div>




                        

                        </div>



                      
                      </div>

                    ))
                  }
                </div>
                  {carts.length > 0 ? <div className="precoCompra">Subtotal: R$ {Number(total + totalAdd).toFixed(2)}</div> : null}

    </div>
   </div>

      <div className='adicional'>
        <div className='adicionalTitle'>Adicional</div>


        <div className='adicionalContent'>

          {

            beb.map((dado, index) => (

              <div className='adicinalCard' key={index}>
                <div>{dado.nome}</div>


                <div className='btnPrecoAdicional'>
                  <div className='preco'>R$ {dado.preco}</div>

                  <div className='btnAdicional'>

                   
                  
                    {dado.qty > 0 ? <div className='btnMenos' onClick={() => handleMenos(dado)}>-</div> : null}
                    {dado.qty > 0 ? <div className='preco'>{dado.qty}</div> :null }
                    <div className='btnPlus' onClick={() => handlePlus(dado)}>+</div>
                   



                  </div>

                </div>




              </div>

            ))

          }
        </div>




      </div>
</div>
    </div>
</section>
     <Cart />
    <Footer/>
       
        </>
    )
}