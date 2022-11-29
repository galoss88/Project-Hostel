import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "../../Redux/actions";
import style from "../Contact/style.module.css";

export default function Faq() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!FAQs.length) {
      dispatch(getFaq());
    }
  }, [dispatch]);
  const FAQs = useSelector((state) => state.faq);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p>
        Haga click en el siguiente botón para visualizar las preguntas
        frecuentes
      </p>
      <Button variant="primary" onClick={handleShow}>
        Preguntas Frecuentes
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preguntas Frecuentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`accordion ${style.bgWhites} container my-4`}
            id="accordionPanelsStayOpenExample"
          >
            {FAQs?.map((info) => {
              return (
                <div
                  className={`accordion-item ${style.bgWhites}`}
                  key={info.id}
                >
                  <h2
                    className={`accordion-header`}
                    id="panelsStayOpen-headingOne"
                  >
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
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
