
import React, { useState, useEffect } from "react";
import axios from 'axios'
import "../styles/list.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import HeaderBanner from "./bannerHeader"

function Banner() {
    const navigate = useNavigate();

    const [item, setItem] = useState([])
    const [image, setImage] = useState("")
    const [modal ,setModal]=useState(false)
    const url = "https://server-4w73.onrender.com/"


    useEffect(() => {
        if (localStorage.getItem("idAdmin")) {
            navigate('/admin/dashboard/banner')
        } else {
            navigate('/admin/login')
        }

    }, [])


    useEffect(() => {

        listItem()
       

    }, [])

   

    const listItem = () => {
        axios.get("https://server-4w73.onrender.com/banners").then((res) => {
            setItem(res.data);

        });
    }


  


    const handleRemove = (id) => {
        console.log(id)
        if (window.confirm('tem certeza de excluir esse usuáorio')) {
            axios.get("https://server-4w73.onrender.com/delete/banner/" + id).then((response) => {

                listItem()

            });
        }
    }

    function handleImage(id){
      console.log(id)
        axios.get("https://server-4w73.onrender.com/banner/" + id).then((response) => {

           setModal(true)
           setImage(response.data)

        });
    }

    function handleClose(){
        setModal(false)
    }

    // paginação

    const [itensPerPage, setItensPerPage] = useState(8)

    const [currentPage, setCurrentPage] = useState(0)


    const pages = Math.ceil(item.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = item.slice(startIndex, endIndex)



   

    return (
        <>
            <HeaderBanner />

            {
               modal?
                <div className="modal_base">
                    <div className="modal_close" onClick={handleClose}>x</div>
                    <div className="modal_image"><img src={url + image.file} alt="" /></div>
                </div>
             : 
          
            <div className="listas">

                <div className="listasContent container">


                    <div className="btnBarPes">
                        <Link to="/admin/dashboard/create/banner" className="btnAdd">Adicionar banner</Link>

                    </div>


                    <table border="0px" width="100%" className="table">
                        <thead className="thead">
                            <tr>
                                <th>Imagem</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">


                            {

                                currentItens && currentItens.map((dados) => (

                                    <tr key={dados.id}>
                                        <td data-label="Imagem"><img className="image_banner" onClick={() => handleImage(dados._id)} src={url + dados.file} width="60px" alt="" /></td>
                                        <td className="Nome" data-label="Tipo">{dados.tipo}</td>


                                        <td data-label="Ações" className="action">


                                            <button onClick={() => handleRemove(dados._id)} className="btnAtion2 btnAtion">Excluir</button>
                                        </td>
                                    </tr>
                                ))


                            }
                        </tbody>

                    </table>

                    <div className="paginationBase">
                        {Array.from(Array(pages), (itens, index) => {
                            return <button style={index == currentPage ? { background: "red", color: "white" } : null} value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
                        })}
                    </div>
                </div>
            </div>
              }
           
        </>
    )

}

export default Banner