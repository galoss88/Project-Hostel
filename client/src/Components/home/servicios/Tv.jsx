import React from 'react'
import { FaTv } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
export default function Tv() {
    const [lgShow, setLgShow] = useState(false);
  return (
    <div>
      <Button onClick={() => setLgShow(true)}><FaTv size={80}/></Button>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Tv Led 43"
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <div className="card">
                <img
                  src="https://media-cdn.tripadvisor.com/media/photo-s/02/b5/95/5e/pampa-hostel.jpg"
                  className="card-img-top"
                  alt="recepcion"
                />
                <div className="card-body">
                  <p className="card-text">Tv Led disponible en sala principal</p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
    </div>
  )
}
