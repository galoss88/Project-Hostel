import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getAllCountries, getCLient, postClient, forgetstate } from "../../Redux/actions";
import { getRent } from '../../Redux/actions';

import { BsFillPencilFill } from "react-icons/bs";
/////////////////
import "./RoomDetail.css";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getRoomDetail } from "../../Redux/actions";
import Footer from "../Layout/Footer";
import moment from "moment";
import {DateRangePicker} from "react-date-range"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "bootstrap/dist/css/bootstrap.min.css";
import SweetAlert from 'react-bootstrap-sweetalert';
import {socket} from '../../App'

import Carousel from "react-bootstrap/Carousel";

export default function RoomDetail() {
  
  const client = useSelector((state) => state.client);
  const room = useSelector((state) => state.roomdetail);
  const image = useSelector((state) => state.roomdetail.image);
  const countries = useSelector((state) => state.countries);
  const { getAccessTokenSilently } = useAuth0();
  const [camas, setCamas] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [pagar, setPagar] = useState("");
  const [cargando, setCargando] = useState(false);
  const [login, setLogin] = useState(false);
  const [payAvalible, setPayAvalible] = useState(true);
  //CONTROL DEL FORM ////////////////////
  const [all, setAll] = useState(false);
  const [verRoom, setVerRoom] = useState(false);
  const [verCheckIn, setVerCheckIn] = useState(false);
  const [verCheckOut, setVerCheckOut] = useState(false);
  const [verLogin, setVerLogin] = useState(false);
  /////ventana emergente
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [name, setName] = useState(true);
  const [lastname, setLastname] = useState(true);

  const [clientInf, setClientInfo] = useState({
    nationality: "",
  });
  ///////
  let imagenes = image;
  //========DATOS DE EJEMPLOS======//
  const userLogin = useAuth0();

  let { id } = useParams();
 let navigate = useNavigate()
  
  useEffect(() =>{
    dispatch(getAllCountries());
    dispatch(getRoomDetail(id));
    dispatch(getRent(id));
    socket.emit('roomView', id)
    socket.on('payRoom',(data)=> setPayAvalible(data.status));
    socket.on('userPay',(data)=>{
      if(data.user != userLogin.user?.email) setPayAvalible(data.status)
    })
    socket.on('userPayC',(data)=> setPayAvalible(data.status));
    return () =>{
      dispatch(forgetstate());
    }
  },[dispatch]);

  
  const rent = useSelector((state) => state.rent);
    //console.log('detail',entrada, salida);
  
    const handleRange = (e) =>{
      setCamas(e.target.value)
      setTotal(e.target.value*room.price)
    }
    // const data = (b, e)=>{
    //     console.log(e.target.value)
    //     if(b) return setCheckIn(e.target.value.split('-').reverse().join('-'));
    //     return setCheckOut(e.target.value.split('-').reverse().join('-'));

    // }
    const [calendar, setCalendar] = useState(false);

    //*******************VALIDACION CALENDARIO */
    let dateArray = [];
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [departureDate, setdepartureDate] = useState(new Date());
    function getDates(startDate, stopDate) {
        var currentDate = moment(startDate);
        var stopDatee = moment(stopDate);
        while (currentDate <= stopDatee) {
          dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
          currentDate = moment(currentDate).add(1, "days");
        }
        return dateArray;
    }
    let reservas = [];
    // let llegada = rent ? rent.dateIn:'2022-00-00';
    // let salida = rent ? rent.dateOut:'2022-00-00';
    // rent.map((e) =>{
    //     let array;
    //     reservas.push(
    //         array = new Array(new Date(e.dateIn.split("-").reverse().join("-")), new Date(e.dateOut.split("-").reverse().join("-")))
    //         )
    //     })
        // llegada = new Date(llegada.split("-").reverse().join("-"));
        // salida = new Date(salida.split("-").reverse().join("-"));
        // getDates(reservas[0][0],reservas[0][1])
        
        dateArray = dateArray.map((d) =>{
            return new Date(d)
          });
        // getDates(llegada, salida);

        

          const selectionRange = {
            startDate: arrivalDate,
            endDate: departureDate,
            key: 'selection',
        }
        const handleSelect = (e)=>{
            setArrivalDate(e.selection.startDate);
            setdepartureDate(e.selection.endDate);

            setCheckIn(moment(e.selection.startDate).format("YYYY-MM-DD").split("-").reverse().join("-"));
            setCheckOut(moment(e.selection.endDate).format("YYYY-MM-DD").split("-").reverse().join("-"));

        }
        // setArrivalDate(arrivalDate.getDate());


        
    const pay = async ()=>{
        // VERIFICACION DE DATOS DE LA RESERVA
        if(!userLogin.isAuthenticated) return setVerLogin(true);
        if(!camas && !checkIn && !checkOut && !pagar) return setAll(true);
        if(!camas) return setVerRoom(true);
        if(!checkIn) return setVerCheckIn(true);
        if(!checkOut) return setVerCheckOut(true);
        
       //CONTROL DE DATOS DEL USUARIO

    if (
      !client.name ||
      !client.lastname ||
      !client.country ||
      !client.phoneNumber ||
      !client.email ||
      !client.personalID 
    )
      return setShow(true);

            const body = {}
            body.items = [{
                title: room.description,
                quantity:  parseInt(camas),
                unit_price: room.price,
                check_in: checkIn,
                check_out: checkOut,
                room_id : room.id,
                client_id: client.id && client.id
            }]
            body.user = {
                name: client.name,
                lastname: client.lastname,
                email: client.email,
                identification: {
                    type: "DNI",
                    number: client.personalID
                }
            };
            socket.emit('userPayRoom',id, userLogin.user.email)
            setCargando(!cargando);
            const token = await getAccessTokenSilently();
            
            // const result = await axios.post("http://localhost:4000/payment", body,
            const result = await axios.post("https://hostelproject-production.up.railway.app/payment", body,
                {headers:{
                    authorization:`Bearer ${token}`
                 }
                } 
            );
            setPagar(result.data.init);
        }
    const cancelarPago = ()=>{
      setCargando(!cargando);
      setPagar("")
      socket.emit('cancelPay', id)
    }
  ///handle ventana emergente

  function handleChange(e) {
    setClientInfo({
      ...clientInf,
      [e.target.name]: e.target.value,
    });
  }
  function handleName(e) {
    e.preventDefault();
    setName(!name);
  }

  function handleLastName(e) {
    e.preventDefault();
    setLastname(!lastname);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const authorization = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await dispatch(postClient(clientInf, authorization));
    setClientInfo({});
    await dispatch(getCLient(token));
    setName(true);
    setLastname(true);
  }
 

    return (

    <div className='detailRoom mx-auto'>
      <input className="btn btn-primary" onClick={(e)=>navigate(-1)} type="button" value="Atras"/>
             {
                // CONTROL DE DATOS DE USUARIO 
           <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton className="bg-primary text-white">
             <Modal.Title>Datos del Cliente</Modal.Title>
           </Modal.Header>
           <Modal.Body className='bg-dark text-white'>
             {
                ( !client.nacionality || !client.phoneNumber || !client.email) && 
                (<p>Por favor complete con los datos faltantes</p>)
             }
             
             <Form onSubmit={e=> handleSubmit(e) }>
               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                 <Form.Label>Nombre</Form.Label>
                 <div className="input-group">
             { client.name ?
                <>                
                <input type="text" className="form-control" name='name' id="validationCustom01" disabled={name} value={name ? client.name : clientInf.name }  onChange={e=> handleChange(e)} required />
                 <button className="btn btn-outline-danger" type='button' onClick={e => handleName(e)}><BsFillPencilFill /></button>
                </>
                  :
                  <Form.Control
                  onChange={e=> handleChange(e)}
                   className=' bg-gradient'
                    type="text"
                    placeholder="Nombre"
                    autoFocus
                    name='name'
                  />
                  }
                  </div>
                <Form.Label>Apellido</Form.Label>
                <div className="input-group">
                  {client.lastname ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        name="lastname"
                        disabled={lastname}
                        defaultValue={client?.lastname}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={(e) => handleLastName(e)}
                      >
                        <BsFillPencilFill />
                      </button>
                    </>
                  ) : (
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      className=" bg-gradient"
                      type="text"
                      placeholder="Apellido"
                      autoFocus
                      name="lastname"
                    />
                  )}
                </div>
                <Form.Label>Pais</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="nationality"
                  onChange={(e) => handleChange(e)}
                >
                  <option  >Selecciona tu Pais</option>
                  
                  {                                                     
                        countries?.map(coun => (
                            coun.country === client.country ?
                            <option key ={coun.id} value = {coun.id} selected> {coun.country} </option>
                            :
                            <option key ={coun.id} value = {coun.id}> {coun.country} </option>)
                        )
                    }
                </Form.Select>
                <Form.Label>DNI o Pasaporte</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  className=" bg-gradient"
                  type="text"
                  placeholder="DNI o Passport"
                  autoFocus
                  name="personalID"
                  defaultValue={client?.personalID}
                />
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange(e)}
                  className=" bg-gradient"
                  type="text"
                  placeholder="Telefono"
                  autoFocus
                  name="phoneNumber"
                  defaultValue={client?.phoneNumber}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className=" text-white">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                handleSubmit(e);
                handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {/* //CONTROL DE LA RESERVA DE LA HABITACION!  */}
      {
          <SweetAlert
            show={all}
            error
            title="Oops...!"
            onConfirm={() => {
              setAll(false);
            }}
          >
          Por favor, complete todos los datos de la reserva.
          </SweetAlert>
      }
      {
        <SweetAlert
          show={verRoom}
          error
          title="Oops...!"
          onConfirm={() => {
            setVerRoom(false);
          }}
        >
        Seleccione al menos una cama para pedir reserva.
        </SweetAlert>
      }
      {
        <SweetAlert
          show={verCheckIn}
          error
          title="Oops...!"
          onConfirm={() => {
            setVerCheckIn(false);
          }}
        >
        Por favor, seleccione una fecha de ingreso.
        </SweetAlert>
      }
      {
        <SweetAlert
          show={verCheckOut}
          error
          title="Oops...!"
          onConfirm={() => {
            setVerCheckOut(false);
          }}
        >
        Por favor, ingrese una fecha de salida.
        </SweetAlert>
      }
      {
        <SweetAlert
          show={verLogin}
          error
          title="Oops...!"
          onConfirm={() => {
            setVerLogin(false);
          }}
        >
        Debe estar registrado para reservar.
        </SweetAlert>
      }
      {!userLogin.isAuthenticated ? (
        <div hidden={login} >
        <SweetAlert
          warning
          onConfirm={() => {setLogin(true)}}
          title="Oops...!"
        >
        <span>Para poder hacer reservas debes registrarte primero</span>
        </SweetAlert>
        </div>
      ) : null}
      
      <Modal show={calendar} onHide={() => {setCalendar(false)}} >
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                minDate={new Date}
                disabledDates={dateArray}
                // excludeDates={disableFinal}
                // minDate={fecha}
                // selected={false}
                // onChange={onChange}
                // startDate={startDate2}
                // endDate={endDate2}
                // selectsRange
                // inline
                // onClick={() => disableBoton(fechaBotonArray, fechaBotonMoment)}
                // monthsShown={3}
                />
            <Button onClick={() =>{setCalendar(false)}} >
            Confirmar
            </Button>
        </Modal>
                <h1>Detalle de la habitacion</h1>
        <div className="titul">
          <h3>{room.name}</h3>
          <h2>{room.description}</h2>
        </div>
      <div className="carrusel mt-4 w-75 m-auto" >
        {
          imagenes &&
          <Carousel >
            {
              imagenes.map((img, index) =>{
                return(
                  <Carousel.Item key={index} >
                    <img
                    
                    src={img}
                    alt="habitacion de Hostel"
                    />
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        }
      </div>
      <div>
        <br/>
        <div className='container d-grid gap-2 col-6 mx-auto'>
              <button disabled={room.status} className="btn btn-secondary" onClick={() => {setCalendar(true)}} >Seleccione una fecha</button>
          </div>
        <div className="Ac">
        <h2 style={{marginTop: "2vh"}}>${room.price} por cama</h2>
          <b>Camas a reservar: {camas}</b>
        </div>
      </div>
      <div className="rangebeds">
        <input
        id="customRange3"
        className="form-range"
        type= "range"
        min="0"
        max= {room.beds_avalaibles} 
        onChange={handleRange}
        defaultValue= "0"
        disabled={room.status}
        step="1"
        />
      </div>
      {room.status && (
        <div className="disponibilidad">No hay camas disponibles</div>
      )}
      <div className="pay">
        <p>
          <b>Total ${total}</b>
        </p>
        <input
          onClick={pay}
          type="submit"
          disabled={room.status}
          value={cargando ? "Cargando..." : "Pagar"}
        />
      </div>
      {!pagar.length ? null : (
        <div className="IframeDiv">
          <button onClick={cancelarPago}>X</button>
          <iframe className="PagarIframe" src={pagar} frameborder="0"></iframe>
        </div>
      )}
      <br />
      <Footer />
    </div>
  );
}
