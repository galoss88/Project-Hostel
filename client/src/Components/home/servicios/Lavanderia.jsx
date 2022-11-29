import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { MdOutlineLocalLaundryService} from "react-icons/md";
export default function Lavanderia() {
  const [lgShow, setLgShow] = useState(false);
  return (
    <div>
      <div className="col-md-4">
        <Button onClick={() => setLgShow(true)}>< MdOutlineLocalLaundryService size={80}/></Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-sizes-title-lg">Lavanderia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <img
                src="https://tecnohotelnews.com/wp-content/uploads/2018/12/shutterstock_422824102.jpg"
                className="card-img-top"
                alt="lavanderia"
              />
              <div className="card-body">
                <p className="card-text">Servicio de lavanderia</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
