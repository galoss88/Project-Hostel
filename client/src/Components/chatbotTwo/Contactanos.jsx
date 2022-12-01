import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../Contact/style.module.css";
import emailjs from "emailjs-com";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
export default function Contactanos() {
  const [show, setShow] = useState(false);
  const [msj, setMsj] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleChange(e) {
    setMsj({ ...msj, [e.target.name]: e.target.value });
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
    setMsj({ name: "", email: "", message: "" });
  }

  return (
    <>
      En el siguiente boton podra enviar un formulario de consulta, le
      contestaremos a la brevedad. Gracias
      <Button variant="primary" onClick={handleShow}>
        Contactanos
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Contactanos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  onChange={(e) => handleChange(e)}
                  required
                />
                <div className="valid-feedback">¡Se ve bien!</div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <label
                  htmlFor="validationCustomUsername"
                  className="form-label"
                >
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
                    onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
