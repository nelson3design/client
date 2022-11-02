import { useState } from "react";
import "../styles/header.css"
import { MdOutlineRestaurant } from "react-icons/md";
import { FaClipboardCheck, FaTimes, FaBars, FaRegImages } from "react-icons/fa";


export default function HeaderBanner() {
    const [hamb, setHamb] = useState(true)
    const [times, setTimes] = useState(false)

    const handleHamb = () => {
        setTimes(!times)
        setHamb(!hamb)
    }
    const handleTimes = () => {
        setHamb(!hamb)
        setTimes(!times)
    }


    return (
        <>
            <header className="headerBack">
                <nav className="nav container">
                    <a className="logoBack" href="http://localhost:3000/admin/dashboard">menu</a>
                    <div className="iconMobile">
                        {hamb ? <FaBars onClick={handleHamb} className="iconM" /> : null}
                        {times ? <FaTimes onClick={handleTimes} className="iconM" /> : null}
                    </div>

                    <ul className="navlistBack navBackMobile">

                        <li><a href="http://localhost:3000/admin/dashboard"><MdOutlineRestaurant /> <span>cardápio</span></a></li>
                        <li><a href="http://localhost:3000/admin/dashboard/andamento"><FaClipboardCheck /> <span>pedidos</span></a></li>
                        <li className="ative"><a href="http://localhost:3000/admin/dashboard/banner"><FaRegImages /> <span>banner</span></a></li>



                    </ul>
                </nav>
                {times ?
                    <ul className="mobileLinks">
                        <li><a href="http://localhost:3000/admin/dashboard"><MdOutlineRestaurant /> <span>cardápio</span></a></li>
                        <li><a href="http://localhost:3000/admin/dashboard/andamento"><FaClipboardCheck /> <span>pedidos</span></a></li>
                        <li className="ative"><a href="http://localhost:3000/admin/dashboard/banner"><FaRegImages /> <span>banner</span></a></li>

                    </ul>
                    : null}

            </header>

        </>
    )
}

