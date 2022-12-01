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
import { RiDeleteBin5Line } from "react-icons/ri";

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
          const id = data.asset_id;
          const fileURL = data.secure_url;
          let imagenUpload = image.array;
          imagenUpload.push({ url: fileURL, id });
          const nuevoObjeto = { ...image, imagenUpload };
          console.log(nuevoObjeto);
          setImage(nuevoObjeto);
          setRoom({
            ...room,
            image: image,
          });
        });
    });
    axios.all(uploaders).then(() => {
      setLoading("false");
    });
  };

  // HANDLES //
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

  const alertaSeguro = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  function handleDeleteImage(foto) {
    alertaSeguro
      .fire({
        title: "Estas seguro que quieres eliminar la imagen?",
        text: "Luego no es posible revertirlo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminalo!",
        cancelButtonText: "No, mejor no!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let filterURL = [
            image.array.filter((borrada) => {
              if (borrada.id !== foto) {
                return borrada;
              }
            }),
          ];

          const nuevoObjeto = { ...image, array: filterURL[0] };
          setImage(nuevoObjeto);
          setRoom({ image: nuevoObjeto });

          alertaSeguro.fire(
            "Borrado!",
            "La imagen ha sido borrada correctamente",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alertaSeguro.fire(
            "Se cancelo el borrado!",
            "La imagen esta a salvo",
            "error"
          );
        }
      });
  }
  // VALIDATIONS //

  // SUBMIT //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !room.beds ||
      !room.bathroom ||
      !room.description ||
      !room.image ||
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

  // SUMAR CUCHETAS //
  useEffect(() => {
    sumarCamas();
  }, [room.simples, room.cuchetas]);

  // RENDER //
  return (
    <div>
      <div className="box-create" style={{ backgroundColor: "#bdbdbd" }}>
        <Form
          onSubmit={(e) => handleSubmit(e)}
          style={{ width: "80%", display: "flex", flexDirection: "column" }}
          className="create-form"
        >
          <h2>Creacion de habitaciones: </h2>
          <Row className="d-flex justify-content-between">
            <Form.Group as={Col} md="3">
              <Form.Label>Tipo (*): </Form.Label>
              <Form.Select onChange={(e) => handleTipoSelect(e)}>
                <option>Elegir tipo de Habitacion</option>
                <option value="1">Compartida</option>
                <option value="2">Privada</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Baño (*): </Form.Label>
              <Form.Select onChange={(e) => handlebañoSelect(e)}>
                <option>Elegir tipo de baño</option>
                <option value="True">Privado</option>
                <option value="False">Compartido</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Precio (*): </Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="100000"
                name="price"
                defaultValue=""
                value={room.price}
                onChange={handleChange}
                isV
              />
            </Form.Group>
          </Row>
          <br />
          <Row className="d-flex justify-content-between">
            <Form.Group as={Col} md="6">
              <Form.Label>Descripcion (*): </Form.Label>
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
          <br />
          <Row className="d-flex justify-content-between">
            <Form.Group as={Col} md="3">
              <Form.Label>Cama simple (*): </Form.Label>
              <Form.Control
                type="number"
                name="simples"
                min="0"
                max="10"
                value={room.simples}
                onChange={async (e) => {
                  await handleSimples(e);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Camas cuchetas (*): </Form.Label>
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
                      <>
                        <img
                          className="rounded mx-auto d-block"
                          src={`${foto.url}`}
                          alt=""
                          style={{
                            width: "400px",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(foto.id)}
                          className="rounded mx-auto d-block"
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </>
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
