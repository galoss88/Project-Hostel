import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css"
export default function Reservas() {
  const navigate = useNavigate();
  return (
    <div>
      <p>
        Para realizar una reserva se debe dirigir al siguiente enlace donde
        encontrara las habitaciones y podra elegir la que mas se adapte a su
        necesidad. Una vez tomada su decision haga click en el boton RESERVAR,
        donde podra elegir su fecha de reserva, elegir su cama y proceder al
        pago: <br/>
        {<NavLink className={styles.navLink} style={{height:"1000px"}} to={"/rooms"}>Nuestras habitaciones</NavLink>}
      </p>
    </div>
  );
}
