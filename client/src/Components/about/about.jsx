import {useState, useEffect} from 'react';
import Typed from 'typed.js';
import "./about.css";

export default function Aboutus() {


    const [about, setComponent] = useState(document.querySelector('.about'));
    var  options  =  { 
        strings : ['Dinamita <b>Team</b>', "Dinamita <b>Hostel</b>" ],
        typeSpeed : 100,
        backSpeed: 50,
        showCursor: true,
        cursorChar: '_',
        autoInsertCss: true,
    } ;
    const paralax = (num)=>{
        document.getElementById('About2').style.marginTop=num+'px'
    }
    useEffect(()=>{
    if(!about) {
        setComponent(document.querySelector('.about'))
        new Typed('.about', options)
    }
    },[about])



    return (
        <div className='aboutPage'>
            <div className='About'>
                <div className='titulo'>
                    <h1 className="about"></h1>
                </div>
                <p>En pocas palabras, un hostel es un tipo de alojamiento económico en el que poder compartir experiencias sociales. Quizás sea una idea un poco ambigua… y es que no hay dos hostels iguales. Pero podemos prometerte una cosa: nunca serán aburridos. Pero espera, ¿cuál es la diferencia entre albergue y hostel? Ninguna. Son sinónimos. ¿Y un hostal qué es? Se trata de un establecimiento similar a un hotel, pero de una categoría inferior, y por ello más económico. Pero en algunos países de Latinoamérica, hostal también es sinónimo de albergue.</p>
            </div>
        </div>
    )
}