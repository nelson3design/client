import { FaWhatsapp,FaInstagram, FaFacebook } from "react-icons/fa";
import "./style/footer.css"
import Cart from "./assets/cart_1.png"
import Pix from "./assets/pix_1.png"

export default function Footer(){



    return(
        <>
       <footer className="footer">
        <div className="footerContent container">
            <div className="footerItens">
                <div className="footertTitle">atendimento</div>
                <div className="footerText">
                    <p>segunda a sexta: 08:00 ÁS 23:00H</p>
                <p><a className="footerIcon1" href="https://api.whatsapp.com/send?phone=554899856534&text=Menu" target="blank"><FaWhatsapp className="iconWat"/> (48) 9985-6534</a></p>
                </div>
            </div>
            <div className="footerItens">
                <div className="footertTitle">institucional</div>
               <div  className="footerText">
                <p>sobre Menu</p>
               <p>destaques</p>
               <p>cardápio</p>
               </div>
               
            </div>

             <div className="footerItens">
                <div className="footertTitle">AJUDA</div>
               <div  className="footerText">
                <p>fale conosco</p>
               <p>meus pedidos</p>
               <p>política de privacidade</p>
               </div>
               
            </div>

            <div className="footerItens">
                <div className="footertTitle">pagamento</div>
               <div  className="footerText">
                <p><img src={Cart} alt="cart_1"/></p>
                <p><img src={Pix} alt="pix_1"/></p>
               </div>
               
               
            </div>

            <div className="footerItens">
               <div className="footertTitle">NOS ACOMPANHE</div>
               <div  className="footerText footerIcon">
                <p><FaFacebook/></p>
                <p><FaInstagram/></p>
               </div>
               
               
            </div>

        </div>


        <div className="Todos">
            <p>© 2022 MENU. Todos os direitos reservados.</p>
        </div>
       </footer>
        </>
    )
}