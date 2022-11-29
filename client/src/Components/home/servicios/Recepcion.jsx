import React from 'react'
import { MdPerson } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function Recepcion() {
    const [lgShow, setLgShow] = useState(false);
  return (
    <div>
     
          <Button onClick={() => setLgShow(true)}><MdPerson size={80}/></Button>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Recepcion 24*7
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <div className="card">
                <img
                  src="https://www.hosteleriabenidorm.com/wp-content/uploads/Disen%CC%83o-sin-ti%CC%81tulo-2021-11-09T135926.546.jpg"
                  className="card-img-top"
                  alt="recepcion"
                />
                <div className="card-body">
                  <p className="card-text">Recepcion disponible las 24hs, los 7 dias de la semana</p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        
    </div>
  )
}
