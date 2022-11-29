import React, { useEffect } from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { cardStyles } from "./ReusableStyles";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients, getRooms } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { getRents } from "../../Redux/actions";
import { BiBed } from "react-icons/bi";

export default function Analytics() {
  const {getAccessTokenSilently} = useAuth0();
  const dispatch = useDispatch();

  const clientes = useSelector((state)=>state.allClients)
  const rents = useSelector((state) => state.rents)  
  const rooms = useSelector(state=>state.rooms)

  const protectClients = async ()=>{
  const token = await getAccessTokenSilently();
  dispatch(getAllClients(token))
  } 

  const getRentsInfo = async ()=>{
    const token = await getAccessTokenSilently();
    dispatch(getRents(token))
    } 
  
  useEffect(()=>{
  protectClients()  
  } ,[dispatch])

  // Esto es para mostrar las ganancias
  useEffect(() => {
    getRentsInfo()
    dispatch(getRooms());
  }, [])  
 
  
  function totalRent(){
    let totalR = rents.map(rent => rent.price).reduce((a,b)=>a+b,0)
    return Math.ceil(totalR)    
  }
  function totalBeds(){
    let totalB = rooms.map(room => room.beds).reduce((a,b)=>a+b,0)
    return totalB
  }
  function totalBedsAvalaibles(){
    let totalBa = rooms.map(room => room.beds_avalaibles).reduce((a,b)=>a+b,0)
    return totalBa
  }

  return (
    <Section>
      <div className="analytic ">
        <div className="logo"><BiGroup /></div>
        <div className="content">
          <h5>Clientes registrados:</h5>
          <h2>{clientes.length}</h2>
        </div>
      </div>
      
      <div className="analytic">
        <div className="logo"><IoStatsChart /></div>
        <div className="content">
          <h5>Ingresos</h5>
          <h2>${totalRent()}</h2>
        </div>
      </div>

      <div className="analytic">
        <div className="logo"><BiBed /></div>
        <div className="content">
          <h5>Total de camas</h5>
          <h2>{totalBeds()}</h2>
        </div>
      </div>

      <div className="analytic ">
        <div className="logo"><FaBed /></div>
        <div className="content">
          <h5>Camas disponibles:</h5>
          <h2>{totalBedsAvalaibles()}</h2>
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
