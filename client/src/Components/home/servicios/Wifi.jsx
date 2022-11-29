import React from 'react'
import { FaWifi } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
export default function Wifi() {
    const [lgShow, setLgShow] = useState(false);
  return (
    <div>
       {/* //WIFI ---------------------------------------------------->> */}
       
          <Button onClick={() => setLgShow(true)}>
            <FaWifi size={80} />
          </Button>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                SERVICIO WI-FI
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <img
                  src="https://d500.epimg.net/cincodias/imagenes/2020/08/12/smartphones/1597235856_381527_1597236258_noticia_normal.jpg"
                  className="card-img-top"
                  alt="wifi"
                />
                <div className="card-body">
                  <p className="card-text justify-content-center">
                    Servicio internet disponible en todo el sector del hostel
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        
    </div>
  )
}
