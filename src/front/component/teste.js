
import { useState, useRef, useEffect } from "react";

export default function Teste(){
    const ref = useRef(null);
    const listRef = useRef(null);
    const arr =["nelson","lorna","chico","sony"]

    useEffect(() => {
       
        const parent = ref.current;
        const nome = document.querySelectorAll('.name')

                
            for(let i =0 ; i < nome.length; i++){
                
                nome[i].addEventListener('click', (e) => {
                       console.log(e.target)
                       e.target.style.display="none"
                    })
            }
          
      
       
    }, []);

    return(
      <>
           {
            arr.map((item)=>(
                <div className="name" ref={ref}>{item}</div>
            ))
           }
      </>
    )
}