import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import { getCLient, getOwnerSp } from "../../Redux/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import MenuUsuario from "./MenuUsuario.jsx";
function Navbars() {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const [view, setView] = useState(true);
  const [opt, setOPT] = useState(false);
  const [confirmLog, setConfirmLog] = useState(false);
  const [Sort, setSort] = useState("");
  const info = useSelector((state) => state.owner);

  const verOptiones = () => {
    const bar = document.querySelector(".nav");
    if (view) {
      setView(false);
      return (bar.style.height = "max-content");
    } else {
      setView(true);
      return (bar.style.height = "0");
    }
  };

  async function getInfoClient() {
    const token = await getAccessTokenSilently();
    dispatch(getCLient(token));
  }

  useEffect(() => {
    let idUser = localStorage.getItem("IDUser");
    if (idUser) {
      getInfoClient();
      setConfirmLog(true);
    }
    if (!info.length) dispatch(getOwnerSp());
  }, [dispatch]);

  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Container fluid>
          <Link
            style={{ textDecoration: "none" }}
            to="/"
            className="d-block icon-hostel"
          >
            <div className="navbar-brand d-flex">
              <img
                src={logo}
                alt="Logo"
                width="50"
                height="50"
                className="d-inline-block align-text-top bg-light rounded-1"
              />
              <p className="m-auto ms-3">{info.hostelName}</p>
            </div>
            {/* </div> */}
          </Link>
          <div className={` nav navbar-nav navbar-nav ${opt ? "yes" : "no"}`}>
            {/* <div className={`w-75 mx-auto justify-content-center nav navbar-nav navbar-nav ${opt ? 'yes' : 'no'}`}> */}
            <div className="but">
              <div className="act" onClick={() => setOPT(!opt)}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <Nav className=" nav justify-content-center navbar-nav">
              <Link className="linkComponent fs-5" to="/rooms">
                Habitaciones
              </Link>
              <Link className="linkComponent fs-5" to="/contact">
                Contactanos
              </Link>
              <Link className="linkComponent fs-5" to="/about">
                Acerca de
              </Link>

              {/*-------------------------------------------------------------------------------------- */}

              {/*------------------------------------------------------------------------------------------- */}
            </Nav>
          </div>
          <MenuUsuario className="m-5" />
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;
