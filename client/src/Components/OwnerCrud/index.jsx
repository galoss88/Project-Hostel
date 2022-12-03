import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row"
import style from './style.module.css'
import { postOwner,getOwner } from "../../Redux/actions";
import {useDispatch, useSelector} from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2'

export default function OwnerCrud() {
  const {isAuthenticated, getAccessTokenSilently} = useAuth0();
  const info = useSelector(state => state.owner);
  const [validated, setValidated] = useState(false);
  const [owner,setOwner ]= useState({})
  const dispatch = useDispatch()

  function handleChange(e) {
    setOwner({...owner,
        [e.target.name]: e.target.value
    })
  }

  async function getOwnerF(){
    const token = await  getAccessTokenSilently()
    dispatch(getOwner(token))
  }

  useEffect(() => {
    if (!info.length) getOwnerF()
  }, [dispatch]);

  async function handleSubmit (event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true){
      const token = await getAccessTokenSilently()
      const authorization = {
        headers: {
          authorization: `Bearer ${token}`
        },
      }
      await dispatch(postOwner(owner, authorization))
      await getOwnerF()
      Swal.fire({
        icon: 'success',
        title: 'Success...',
        text: 'Datos guardados correctamente',
      })
    }
  };

  return (
    <div className={`${style.bgWhites} container my-4`} >
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <h2>Datos del dueño</h2>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre (obligatorio)</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Nombre"
              onChange={e=> handleChange(e)}
              defaultValue={info?.name}
            />
            <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Por favor coloque su nombre.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Apellido (obligatorio)</Form.Label>
            <Form.Control
              required
              name="lastName"
              type="text"
              placeholder="Apellido"
              onChange={e=> handleChange(e)}
              defaultValue={info.lastName}
            />
            <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Por favor coloque su apellido.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Usuario (obligatorio)</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                required
                name="user"
                type="text"
                placeholder="Usuario"
                aria-describedby="inputGroupPrepend"
                onChange={e=> handleChange(e)}
                defaultValue={info.user}
                // value={info.user}
              />
              <Form.Control.Feedback>Genial!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Por favor coloque su E-mail.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <br/>
        <Row className="mb-3">    
        <h2>Datos del hotel</h2>      
          <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Nombre del hotel (obligatorio)</Form.Label>
              <Form.Control
                required
                name="hostelName"
                type="text"
                placeholder="Nombre del hotel"
                onChange={e=> handleChange(e)}
                defaultValue = {info.hostelName}
              />
              <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                required
                name="mail"
                type="text"
                placeholder="E-mail"
                onChange={e=> handleChange(e)}
                defaultValue = {info.mail}
              />
              <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                required
                name="address"
                type="text"
                placeholder="Direccion"
                onChange={e=> handleChange(e)}
                defaultValue = {info.address}
              />
              <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row className="mb-3">          
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Pais (obligatorio)</Form.Label>
            <Form.Control 
              required 
              name="country"
              type="text" 
              placeholder="Pais" 
              onChange={e=> handleChange(e)}
              defaultValue = {info.country}
              />
            <Form.Control.Feedback type="invalid">Por favor, coloque un país válido.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Provincia (obligatorio)</Form.Label>
            <Form.Control 
              required 
              name="city"
              type="text" 
              placeholder="Provincia"
              onChange={e=> handleChange(e)}
              defaultValue = {info.city}
              />
            <Form.Control.Feedback type="invalid">Por favor, coloque una provincia válida.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Codigo postal (obligatorio)</Form.Label>
            <Form.Control 
              required
              name="zip"
              type="text" 
              placeholder="Codigo postal" 
              onChange={e=> handleChange(e)}
              defaultValue = {info.zip}
              />
            <Form.Control.Feedback type="invalid">Por favor, coloque un codigo postal válido.</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <br/>
        <Row className="mb-3">
          <h2>Redes sociales</h2>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Instagram</Form.Label>
            <Form.Control
              name="instagram"
              type="text"
              placeholder="Instagram"
              onChange={e=> handleChange(e)}
              defaultValue = {info.instagram}
              />
            <Form.Control.Feedback>Genial!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Facebook</Form.Label>
            <Form.Control              
              name="facebook"
              type="text"
              placeholder="Facebook"
              onChange={e=> handleChange(e)}
              defaultValue = {info.facebook}
              />
            <Form.Control.Feedback>Genial!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Twiter</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="twitter"
                type="text"
                placeholder="Twitter"
                aria-describedby="inputGroupPrepend"
                onChange={e=> handleChange(e)}
                defaultValue = {info.twitter}
                />
                <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <br/>
        <Row className="mb-3">
          <h2>Informacion para el cliente</h2>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
            <Form.Label>Sobre nosotros</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="aboutUs"
                as ="textarea"
                placeholder="Acerca de..."
                aria-describedby="inputGroupPrepend"
                onChange={e=> handleChange(e)}
                defaultValue = {info.aboutUs}
                />
                <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
            <Form.Label>Porque elegirnos?</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="chooseUs"
                as ="textarea"
                placeholder="Porque elegirnos?"
                aria-describedby="inputGroupPrepend"
                onChange={e=> handleChange(e)}
                defaultValue = {info.chooseUs}
                />
                <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
            <Form.Label>Extras</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="extra"
                as ="textarea"
                placeholder="Extras..."
                aria-describedby="inputGroupPrepend"
                onChange={e=> handleChange(e)}
                defaultValue = {info.extra}
                />
                <Form.Control.Feedback>Genial!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
    
}