import "./style/card.css"
import Image from "./assets/pizza_1.png"

export default function Card(){

    return(
        <>
        <div className="cardBase">
            <div className="cardImg">
                <img src={Image} alt="pizza_1"/>
                <h3>pizza portuguesa</h3>

            </div>

             <div className="cardText">
                <div className="texts">Pão Caseiro,180g de carne</div>
                <div className="cardPreco">
                    <div className="preco">R$ 22.99</div>
                    <div className="btn"><span>comprar</span></div>
                </div>
                
            </div>

        </div>
        </>
    )
}