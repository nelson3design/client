import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import { Link } from 'react-router-dom'
import axios from 'axios'
// import "../styles/create.css"

// import HeaderBanner from "../bannerHeader"

function Comments() {
    const navigate = useNavigate();
    const [upload, setUpload] = useState("")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    const [idProduct, setIdProduct] = useState("633ddc4c68d83dc63eb71900")
    const [note, setNote] = useState("")


    const handleSubmit = ((e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('upload', upload);
        formdata.append('nome', nome);
        formdata.append('email', email);
        formdata.append('text', text);
        formdata.append('idProduct', idProduct);
        formdata.append('note', note);

        axios.post("http://localhost:4000/add-comment", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => {

                if (res.status === 200) {
                    navigate('/')
                }

            })



    })

    return (
        <>
            {/* <HeaderBanner /> */}
            <div className="listas">

                <div className="listasContent container">

                    {/* form */}
                    <div className='formCreatebase'>

                        <h2 className="titleCreate">adicionar banner</h2>

                        <hr className='bars' />
                        <form className='formCreate' onSubmit={handleSubmit} enctype="multipart/form-data">



                            <div className='compraFormContent'>
                                <label>note</label>
                                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="88137624" required />
                            </div>
                            <div className='compraFormContent'>
                                <label>nome</label>
                                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="88137624" required />
                            </div>
                            <div className='compraFormContent'>
                                <label>email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="88137624" required />
                            </div>
                            <div className='compraFormContent'>
                                <label>comentario</label>
                                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="88137624" required />
                            </div>

                            <div className='formCreateContent'>
                                <label>Imagem</label>
                                <input className='uplaod' type="file" name="upload" onChange={(e) => setUpload(e.target.files[0])} />
                            </div>


                            <div className='formCreateContent buttons'>
                                <input type="submit" className="submitCreate" value="adicionar" />

                                <Link to='/admin/dashboard/banner'>
                                    <button className="cancelCreate">cancel</button>
                                </Link>

                            </div>

                        </form>

                    </div>
                    {/* fim form */}

                </div>

            </div>

            {/* <Footer /> */}

        </>
    );
}

export default Comments;
