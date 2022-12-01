import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "../../Redux/actions";
import Swal from 'sweetalert2'

export default function Contact() {
  const faqs = useSelector((state) => state.faq);
  const dispatch = useDispatch();
  const [msj,setMsj ]= useState({})

  function handleChange(e) {
    setMsj({...msj,
        [e.target.name]: e.target.value
    })
  }
  function enviarMail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_30dmxpw",
        "template_ph17gpe",
        e.target,
        "RI99fLwUMn1TTaBI2"
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Se ha enviado correctamente",
        });
        

      }); //serviceId,TemplateId,objeto,key
    setMsj({name:'',
            email:'',
            message:''})
  }

  useEffect(() => {
    if (!faqs.length) {
      dispatch(getFaq());
    }
  }, [dispatch]);

  return (
    <div>
      <div className={`${style.bgWhites} container my-4`}>
        <h4>Tenes alguna duda? escribinos</h4>
        <hr />
        <form
          className="row g-3 needs-validation"
          onSubmit={(e) => enviarMail(e)}
        >
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label htmlFor="validationCustom01" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              name="name"
              value={msj.name}
              onChange={e=> handleChange(e)}
              required
            />
            <div className="valid-feedback">¡Se ve bien!</div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <label htmlFor="validationCustomUsername" className="form-label">
              Correo
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                name="email"
                value={msj.email}
                onChange={e=> handleChange(e)}
                required
              />
              <div className="invalid-feedback">
                Porfavor coloque su correo!
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationTextarea" className="form-label">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="validationTextarea"
              name="message"
              value={msj.message}
              onChange={e=> handleChange(e)}
              required
            ></textarea>
            <div className="invalid-feedback">
              Please enter a message in the textarea.
            </div>
          </div>
          <div className="d-grid gap-2 my-4">
            {/* BOTON ENVIAR */}
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div
        className={`accordion ${style.bgWhites} container my-4`}
        id="accordionPanelsStayOpenExample"
      >
        <h2 className="text-dark">Preguntas frecuentes</h2>
        {faqs.length ? faqs?.map((info) => {
          return (
            <div className={`accordion-item ${style.bgWhites}`} key={info.id}>
              <h2 className={`accordion-header`} id="panelsStayOpen-headingOne">
                <button
                  className={`accordion-button ${style.question} collapsed bg-opacity-25 bg-light`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#panelsStayOpen-collapseOne${info.id}`}
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  {info.question}
                </button>
              </h2>
              <div
                id={`panelsStayOpen-collapseOne${info.id}`}
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className={`accordion-body ${style.response}`}>
                  {info.anwser}
                </div>
              </div>
            </div>
          );
        }):
        <div className="container">
        <h2 className="text-muted p-5">No hay Preguntas frecuentes para Mostrar</h2>
      </div>
      }
      </div>
    </div>
  );
}
