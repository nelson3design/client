import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import { Link } from 'react-router-dom'
import axios from 'axios'
import "../styles/create.css"

import HeaderBanner from "./bannerHeader"

function CreateBanner() {
    const navigate = useNavigate();
    const [upload, setUpload] = useState("")
    const [tipo, setTipo] = useState("")
 



    const handleSubmit = ((e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('upload', upload);
        formdata.append('tipo', tipo);
       
        axios.post("http://localhost:4000/add-banner", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => {

                if (res.status === 200) {
                    navigate('/admin/dashboard/banner')
                }

            })



    })

    return (
        <>
            <HeaderBanner />
            <div className="listas">

                <div className="listasContent container">

                    {/* form */}
                    <div className='formCreatebase'>

                        <h2 className="titleCreate">adicionar banner</h2>

                        <hr className='bars' />
                        <form className='formCreate' onSubmit={handleSubmit} enctype="multipart/form-data">



                            <label>Tipo de Banner</label>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="select">
                                <option value="">Escolhe o tipo de banner</option>
                                <option value="desktop">Desktop</option>
                                <option value="mobile">Mobile</option>
                                

                            </select>

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

            <Footer />

        </>
    );
}

export default CreateBanner;
