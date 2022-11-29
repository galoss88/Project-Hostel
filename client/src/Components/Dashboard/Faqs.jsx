import React from "react";
import { useState, useEffect } from "react";
import { useDispatch,useSelector  } from "react-redux";
import { getFaq, postFaq, delteFaq } from "../../Redux/actions";
import { useAuth0 } from '@auth0/auth0-react';
import { BsFillPencilFill } from "react-icons/bs";
import style from '../Contact/style.module.css'
import Swal from 'sweetalert2'


export default function Faqs (){
    const faqsList = useSelector(state=> state.faq);
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const [faqs, setFaqs] = useState({
        question:"",
        anwser:""
    });
  
   
     
 function handleChange(e) {
        e.preventDefault()
        setFaqs({
            ...faqs,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()   
        const token = await getAccessTokenSilently();
        await dispatch(postFaq(token, faqs))
        dispatch(getFaq())
        setFaqs({question:"", anwser:""})
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu pregunta frecuente se añadio a la lista',
          showConfirmButton: false,
          timer: 1500
        })
    }

async function handleDelete(e){
      e.preventDefault()
      const token = await getAccessTokenSilently();
       Swal.fire({
        title: 'Eliminar pregunta frecuente',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(delteFaq(token, e.target.id))
          Swal.fire(
            '¡Eliminado!',
            'tu pregunta frecuente han sido eliminadas de la lista',
            'success'
          )
        }
        dispatch(getFaq());
      })

    } 

    
    useEffect(() => {
        if(!faqs.length){
            dispatch(getFaq());
        }
    }, [dispatch]);


   return(
   <div className="container-fluid d-flex justify-content-between row m-auto mt-3">
      <form className={`row needs-validation col-12 mt-3 p-0 w-75 m-auto ${style.bgWhites}`}  onSubmit={e=>handleSubmit(e)}>
      <h2 className="text-center h2">Crear nuevo FaQ</h2>
   <>
               <div className="col-10 m-auto">
                        <label htmlFor="validationCustom01" className="form-label h4">Pregunta a responder</label>
                        <input type="text" className="form-control" 
                        id="validationCustom01" name ='question' required onChange={e=> handleChange(e)} value={faqs.question}/>
                    </div>
                    <div className="mb-3 col-10 m-auto">
                        <label htmlFor="validationTextarea" className="form-label h5">Respuesta</label>
                        <textarea className="form-control" id="validationTextarea" name ='anwser'
                        required onChange={e=> handleChange(e)} value={faqs.anwser}></textarea>
                    </div>
                    <div className="d-grid gap-2 my-4 col-10 m-auto" >
                    <button className="btn btn-primary" type="submit">Enviar</button>
                    </div>
                    </>
                </form>

<div className={`accordion ${style.bgWhites} col-12 mt-3 row m-auto`} id="accordionPanelsStayOpenExample">
  <h2 className="text-dark">Lista de Preguntas frecuentes</h2>
{
     faqsList?.map(info=>{
      return(
    <div className={`accordion-item ${style.bgWhites} col-lg-4 mt-3`} key={info.id}>
    <h2 className={`accordion-header d-flex flex-nowrap`} id="panelsStayOpen-headingOne">
       <div className="btn-md order-3 mt-1 ms-2">
       <button className="btn btn-close btn-outline-danger bg-danger p-2 " id={info.id} onClick={e=> handleDelete(e)}>
       </button>
       </div>
      <button className={`accordion-button ${style.question} collapsed bg-opacity-25 bg-light`} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseOne${info.id}`} aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
       {info.question}
      </button>
    </h2>
    <div id={`panelsStayOpen-collapseOne${info.id}`} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
      <div className={`accordion-body ${style.response}`}>
      {info.anwser}
      </div>
    </div>
  </div>)
    })
  }
  </div>
   </div>
   );
};