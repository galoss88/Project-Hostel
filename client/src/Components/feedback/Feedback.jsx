import React from "react";
import { useEffect } from "react";
import  { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { sendFeedback } from "../../Redux/actions";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import s from "./feedback.module.css"
export default function FeedBack(){
    const dispatch = useDispatch();
    const queryString = window.location.search;
    useEffect(() =>{
        dispatch(sendFeedback(queryString))
    },[dispatch]);
const params = new URLSearchParams(queryString);
const dni = params.get("dni");
const name = params.get("name");
const check_in = params.get("check_in");
const check_out = params.get("check_out");
const camas = params.get("camas")
const status = params.get("status");
    return(
        <div  style={{margin: "2%"}}>
            { status === "approved" ?
                (
                    <div>
                        <div className={`bg-dark ${s.bgWhites} `}>
                            <div className="d-flex m-2">
                            <IconContext.Provider value={{ size: "100", color: "green"}}>
                                <IoIosCheckmarkCircleOutline />
                            </IconContext.Provider>
                            <h1 className={`tittle d-flex align-items-center ${s.success}`} >Detalles de tu reserva</h1>
                            </div>
                            <p className={`d-flex align-items-flex-end m-10 ${s.pasuccess} `}>
                                Hola {name}:<br></br>
                                    Haz hecho una reserva en Dinamita Hostel con fecha de ingreso el {check_in}, 
                                    con salida el {check_out}, con {camas > 1 ? camas + " camas": camas + " cama"}.
                                <br></br>
                                    Pronto recibira un comprobante de pago al correo registrado.
                                        Saludos!
                            </p>
                        </div>
                        <div className="d-flex col w-100" >
                            <Link style={{ textDecoration: 'none' }} to={`/`}>
                                <button className="btn btn-lg w-30 btn-primary m-2" type="button">Inicio</button>
                            </Link>
                            <button 
                            onClick={() =>{window.history.back()}}
                            className="btn btn-lg w-30 btn-primary m-2" 
                            type="button">Volver a la habitacion</button>
                        </div>
                    </div>
                ):(
                    <div>
                        <div className={`bg-dark ${s.bgWhites} `}>
                            <div className="d-flex m-2">
                                <div className="d-flex m-2" >
                                    <IconContext.Provider value={{ size: "100", color: "red"}}>
                                        <IoIosCloseCircleOutline />
                                    </IconContext.Provider>
                                </div>
                                <h1 className={`tittle d-flex align-items-center ${s.error}`} >Oh oh Algo Malio sal</h1>
                            </div>
                                <p className={`d-flex align-items-flex-end m-10 ${s.paerror} `}>
                                    Algo ocurrio al momento de transaccion, puedes intentar otra vez o reservar otra habitacion
                                </p>
                        </div>
                        <div className="d-flex col w-100" >
                            <Link style={{ textDecoration: 'none' }} to={`/`}>
                                <button className="btn btn-lg w-30 btn-primary m-2" type="button">Inicio</button>
                            </Link>
                            <button 
                            onClick={() =>{window.history.back()}}
                            className="btn btn-lg w-30 btn-primary m-2" 
                            type="button">Volver a la habitacion</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}


