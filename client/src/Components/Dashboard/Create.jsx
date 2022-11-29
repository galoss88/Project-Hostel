import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../../Redux/actions";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Edit from "./EditRoom";
import { useEffect } from "react";
import Dropzone from "react-dropzone";
import { IoIosFolderOpen } from "react-icons/io";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";


const Create = (props) => {
  // SETTEAR INFO//
  const [image, setImage] = useState({ array: [] });
  const [loading, setLoading] = useState("");
  const [room, setRoom] = useState({
    description: "",
    image: [],
    bathroom: "",
    observation: "",
    price: "",
    typeId: "",
    cuchetas: 0,
    simples: 0,
    beds: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SUBIR IMAGENES CON CLOUDINARY //
  const handleImages = (files) => {
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium,gist`);
      formData.append("upload_preset", "hostelImage");
      formData.append("api_key", "397644523311779");
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading("true");
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/drw5h95um/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((res) => {
          const data = res.data;
          const fileURL = data.secure_url;
          let imagenUpload = image.array;
          imagenUpload.push(fileURL);
          const nuevoObjeto = { ...image, imagenUpload };
          setImage(nuevoObjeto);
          console.log(data);
          setRoom({
            ...room,
            image: imagenUpload,
          });
        });
    });
    axios.all(uploaders).then(() => {
      setLoading("false");
    });
  };
  const handleChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  const handleTipoSelect = (e) => {
    setRoom({
      ...room,
      typeId: e.target.value,
    });
  };

  const handlebañoSelect = (e) => {
    setRoom({
      ...room,
      bathroom: e.target.value,
    });
  };

  const handleSimples = (e) => {
    setRoom({
      ...room,
      simples: parseInt(e.target.value),
    });
  };

  const handleCuchetas = (e) => {
    setRoom({
      ...room,
      cuchetas: parseInt(e.target.value),
    });
  };

  const sumarCamas = () => {
    let totales = room.simples + room.cuchetas * 2;
    setRoom({
      ...room,
      beds: totales,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !room.beds ||
      !room.bathroom ||
      !room.description ||
      !room.image ||
      !room.observation ||
      !room.price ||
      !room.typeId
    ) {
      Swal.fire({
        icon: "error",
        title: "Debes completar todos los datos!",
      });
    } else {
      dispatch(createRoom(room));
      Swal.fire({
        icon: "success",
        title: "Habitacion Creada Correctamente",
      });
      setRoom({
        beds: "",
        description: "",
        image: "",
        bathroom: "",
        observation: "",
        price: "",
        type: "",
      });
      navigate("/");
    }
  };
  useEffect(() => {
    sumarCamas();
  }, [room.simples, room.cuchetas]);
  return (
    <div>
      <div className="box-create bg-dark text-white">
        <Form
          onSubmit={(e) => handleSubmit(e)}
          style={{ width: "80%", display: "flex", flexDirection: "column" }}
        >
          <h2>Formulario de creacion de Habitaciones: </h2>
          <Row className="d-flex justify-content-between">
            <Form.Group as={Col} md="5">
              <Form.Label>Baño(OBLIGATORIO): </Form.Label>
              <Form.Select onChange={(e) => handlebañoSelect(e)}>
                <option>Elegir tipo de baño</option>
                <option value="True">Privado</option>
                <option value="False">Compartido</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Tipo(OBLIGATORIO): </Form.Label>
              <Form.Select onChange={(e) => handleTipoSelect(e)}>
                <option>Elegir tipo de Habitacion</option>
                <option value="1">Compartida</option>
                <option value="2">Privada</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="d-flex justify-content-between">
            <Form.Group as={Col} md="5">
              <Form.Label>Descripcion(OBLIGATORIO): </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Escribir una description acerca de la habitacion"
                value={room.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Observaciones: </Form.Label>
              <Form.Control
                as="textarea"
                name="observation"
                placeholder="Escribir una observacion acerca de la habitacion"
                value={room.observation}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="d-flex justify-content-between">
            <Form.Group as={Col} md="3">
              <Form.Label>Camas(OBLIGATORIO): </Form.Label>
              <Form.Control
                type="number"
                name="simples"
                min="1"
                max="10"
                value={room.simples}
                onChange={async (e) => {
                  await handleSimples(e);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Camas Totales:</Form.Label>
              <Form.Control
                disabled
                type="number"
                name="beds"
                value={room.beds}
                onChange={() => {
                  console.log(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Cuchetas: </Form.Label>
              <Form.Control
                type="number"
                name="cuchetas"
                min="0"
                max="10"
                value={room.cuchetas}
                onChange={async (e) => {
                  await handleCuchetas(e);
                }}
              />
            </Form.Group>
            <Row className="justify-content-center">
              <Form.Group as={Col} md="5" style={{ marginLeft: "8px" }}>
                <Form.Label>Precio(OBLIGATORIO): </Form.Label>
                <Form.Control
                  type="number"
                  min="1000"
                  max="1000000"
                  name="price"
                  value={room.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
          </Row>
          <Row className="d-flex justify-content-center">
            <Form.Group as={Col} md="5">
              <Dropzone
                className="dropzone"
                onDrop={handleImages}
                onChange={(e) => setImage(e.target.value)}
              >
                {({ getRootProps }) => (
                  <section>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <span>
                        <IoIosFolderOpen />
                      </span>
                      <p>Insertar imagenes aqui o cliquea para seleccionar</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Form.Group>
          </Row>
          <Row>
            <div>
              <Carousel>
                {image.array?.map((foto, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <button className="rounded mx-auto d-block">X</button>
                      <img
                        className="rounded mx-auto d-block"
                        src={`${foto}`}
                        alt=""
                        style={{
                          width: "200px",
                          height: "180px",
                          objectFit: "cover",
                        }}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </Row>

          <Button
            className="submit"
            type="submit"
            style={{
              alignSelf: "flex-end",
              justifySelf: "flex-end",
              marginTop: "24px",
            }}
          >
            Crear
          </Button>
        </Form>
      </div>
      <Edit />
    </div>
  );
};

export default Create;
