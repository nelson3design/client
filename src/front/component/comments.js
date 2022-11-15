import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaSearchPlus, FaStar, FaRegStar } from "react-icons/fa";
import { Oval } from 'react-loader-spinner'
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};
const styles = {

    stars: {
        display: "flex",
        flexDirection: "row",
    },
  
};


function Comments() {
    const [spinner, setSpinner] = useState(false)
    const star = useRef(null);

    const url2 = "https://server-4w73.onrender.com/"
    const navigate = useNavigate();
    const [upload, setUpload] = useState("")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    // const [idProduct, setIdProduct] = useState("")
    const [note, setNote] = useState("")

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
        setNote(value)
       
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }


    var idString = localStorage.getItem("idProduct")
    var idProduct = JSON.parse(idString)



    const handleSubmit = ((e) => {
        e.preventDefault()
        setSpinner(true)

        const formdata = new FormData();
        formdata.append('upload', upload);
        formdata.append('nome', nome);
        formdata.append('email', email);
        formdata.append('text', text);
        formdata.append('idProduct', idProduct);
        formdata.append('note', note);

        axios.post("https://server-4w73.onrender.com/add-comment", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => {
                
                if (res.status === 200) {
                    setSpinner(false)
                    window.location.reload();

                }

            })

    })

    return (
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
           
            <div className="listas">
                <div className="listasContent container">

                    {/* form */}
                    <div className='formCreatebase formComents'>
              
                        <form className='formCreate' onSubmit={handleSubmit} enctype="multipart/form-data">



                            <div className='compraFormContent'>
                                <label>Clique para Avaliar</label>
                                <div style={styles.stars}>
                                    {stars.map((_, index) => {
                                        return (
                                            <FaStar
                                                key={index}
                                                size={24}
                                                onClick={() => handleClick(index + 1)}
                                                onMouseOver={() => handleMouseOver(index + 1)}
                                                onMouseLeave={handleMouseLeave}
                                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                                style={{
                                                    marginRight: 10,
                                                    cursor: "pointer"
                                                }}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='compraFormContent'>
                                <label>nome</label>
                                <input value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </div>
                            <div className='compraFormContent'>
                                <label>email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className='compraFormContent'>
                                <label>comentario</label>
                                <textarea rows='5' value={text} onChange={(e) => setText(e.target.value)} required>
                                </textarea>
                              
                            </div>

                            <div className='formCreateContent'>
                                <label>Imagem</label>
                                
                                <input className='uplaod' type="file" name="upload" onChange={(e) => setUpload(e.target.files[0])} />
                            </div>


                            <div className='formCreateContent buttons'>
                                <input type="submit" className="submitCreate" value="adicionar" />

                                <Link to='/'>
                                    <button className="cancelCreate">cancel</button>
                                </Link>

                            </div>

                        </form>

                    </div>
                    {/* fim form */}

                </div>

            </div>

           

        </>
    );
}

export default Comments;
