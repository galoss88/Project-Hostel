import React from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import {BiCog} from "react-icons/bi";
import { IconContext } from "react-icons";
//----
import Swal from 'sweetalert2'
import { useAuth0 } from "@auth0/auth0-react";
import { getCLient,getOwner, setClient, getRolUser, getStatus } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";


import { useState, useEffect } from "react";
import style from "./MenuUsuario.module.css";
import Sidebar from "../Dashboard/Sidebar";
import { socket } from "../../App";
import profile from "../../images/profile.png"


const options = [
  {
    name: "Enable body scrolling",
    scroll: true,
    backdrop: false,
  },
  {
    name: "Enable backdrop (default)",
    scroll: false,
    backdrop: true,
  },
  {
    name: "Enable both scrolling & backdrop",
    scroll: true,
    backdrop: true,
  },
];

export default function MenuUsuario({ name, ...props }) {
  const client = useSelector(state=> state.client)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    loginWithPopup,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useDispatch();
  const [view, setView] = useState(true);
  const [confirmLog, setConfirmLog] = useState(false);
  const [Sort, setSort] = useState("");
  
  async function saveClient() {
    try {
      const token = await getAccessTokenSilently();
     await dispatch(setClient(token))
     await dispatch(getStatus(token))
     await getInfo();
    } catch (error) {
      console.log(error);
    }
  }
  async function getInfo() {
    const token = await getAccessTokenSilently();
    dispatch(getCLient(token));
  }
  const [show1, setShow1] = useState(false);
  
  async function getRol(){
    const token = await getAccessTokenSilently();
     await dispatch(getRolUser(token))
    let rol = localStorage.getItem("Rol");
    if(rol === "menu-client" || !rol ){
         saveClient();
      }
      else{
        await dispatch(getOwner(token))
      }
  }

async function statusUser() {
 setTimeout(()=>{
  if(localStorage.getItem("status") == "disabled"){
    Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Su cuenta ha sido bloqueada. Consulte con el administrador en la seccion Contactanos',
            showConfirmButton: false,
            timer: 6000
          })
          setTimeout(() => {
           localStorage.clear();
            logout()
           }, 2000);
         }
   }, 4000)}
  useEffect(() => {
    let idUser = localStorage.getItem("IDUser");
    if (idUser) {
      getInfo();
      setConfirmLog(true);
    }
    socket.on('userBanned',(data)=>{
      localStorage.setItem('status', data)
      statusUser()
    })
  }, [dispatch]);
  return (
    <>
      <Offcanvas show={show} placement="end" onHide={handleClose} style={{backgroundColor: "#212121", gap:"3rem"}}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className={`justify-content-center text-info w-100 mx-0 ms-4 text-center`} >Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <div className="d-flex justify-content-center">
              <img
                  src={isAuthenticated && user.picture ? user.picture : profile }
                  alt="foto perfil"
                  className="rounded-circle border-2 profileIMG"
                />
              </div>
            <div className="container hx-auto">
              <Offcanvas.Body className={`offcanvas-body ${style.bodyCanvas}`}>
                <div className="row mx-auto">
                  <div className="">
                    <div className="list-group bg-dark d-flex" id="list-tab" role="tablist">
                      <button
                        className={`list-group-item list-group-item-action mt-1 list-group-item-dark `}
                        onClick={() => {
                          navigate("/clientEdit");
                        }}
                        id="list-profile-list"
                        data-bs-toggle="list"
                        role="tab"
                        aria-controls="list-profile"
                      >
                        Editar datos
                      </button>
                      <button
                        className={`list-group-item list-group-item-action mt-1 list-group-item-dark `}
                        id="list-messages-list"
                        data-bs-toggle="list"
                        onClick={() => navigate("/reviewHostel")}
                        role="tab"
                        aria-controls="list-messages"
                      >
                        Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </Offcanvas.Body>
            </div>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.clear();
                    socket.emit('userDisconect', user.email)
                    logout();
                    setConfirmLog(false);
                    setSort("deslogueado");
                  }}
                  className={`${style.cerrarSesion} btn btn-outline-danger `}
                >
                 <FiLogOut/>  Cerrar Sesion
                </button>
            </Offcanvas>
            {
              (localStorage.getItem("Rol") === "menu-admin" )
               &&  <div className={style.divButtonAdmin}>
                <button
                 type="button"
                 
                 onClick={() => {
                   setShow1(true);
                 }}
                //  style={}
                className={`${style.adminBTN} btn btn-dark fas fa-cog`}
               >
                <IconContext.Provider value={{ size: "30"}}>
                <BiCog />
                </IconContext.Provider>
               </button>
               </div>
             }

          {isAuthenticated ? (
            <>
            <Offcanvas show={show1} onHide={() =>{setShow1(false)}} placement="end" style={{backgroundColor: "#212121", gap:"3rem"}}>
              <Offcanvas.Header closeButton>
              </Offcanvas.Header>
              <Sidebar></Sidebar>
            </Offcanvas>
            {
              (isAuthenticated && localStorage.getItem("Rol") === "menu-client" ) &&
            <Button variant="outline-light" onClick={handleShow} className="opt ms-5 w-10">
              Menu
            </Button>
            }
            
            </>
          ) : (
              <Button
                variant="outline-light"
                to="/#login"
                className="ms-5 w-10 opt"
                onClick={async (e) => {
                  e.preventDefault();
                  await loginWithPopup();
                  await getRol();
                  await statusUser();
                  setConfirmLog(true);
                }}
              >
                Login
              </Button>
          )}
    </>
  );
}
<Offcanvas.Body></Offcanvas.Body>;