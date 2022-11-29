import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

export default function RedesSociales() {
  const [show, setShow] = useState(false);
  const info = useSelector((state) => state.owner);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p>
        Haga click en el siguiente boton para visualizar nuestras redes sociales
        y un link que lo redirigirá a ellas
      </p>
      <Button variant="primary" onClick={handleShow}>
        Nuestras redes sociales
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Redes sociales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cont">
            <div>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogovector.net%2Fwp-content%2Fuploads%2F2011%2F11%2Ffacebook-f-logo-195x195.png&f=1&nofb=1&ipt=28f161af0961a8646ffa8fed1ec3f3f5ed73a8e77d17060e17876dc360db8976&ipo=images"
                alt="logo Facebook"
              />
              <a href={info.facebook} target="_blank" rel="noopener noreferrer">
                Nuestro Facebook
              </a>
            </div>
            <div>
              <img
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2016%2F07%2FTwitter-PNG-HD-1-180x180.png&f=1&nofb=1&ipt=dda5b1e96bbd66d9abb08f88614313b9a5ebdf90be7530f6507b3cb8f13c4c6d&ipo=images"
                alt="Logo Twitter"
              />
              <a href={info.twitter} target="_blank" rel="noopener noreferrer">
                Nuestro Twitter
              </a>
            </div>
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
