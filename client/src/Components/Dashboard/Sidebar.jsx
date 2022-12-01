import React, { useState } from "react";
import { MdSpaceDashboard, MdRateReview } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import logo from "../../images/logo.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

export default function Sidebar() {
  const [currentLink, setCurrentLink] = useState(1);
  const { logout } = useAuth0();
  return (
    <div>
      <div className="container">
        <Section>
          {/* //TOP-------------------------------------------->> */}
          <div className="top">
            <div className="d-flex  justify-content-center">
              <img
                className="logo"
                src={logo}
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              />
            </div>
            <div className="brand">
              <span className="text-info">
                <b>Project Hostel</b>
              </span>
            </div>

            <div className="links">
              <ul>
                <li
                  className={currentLink === 1 ? "active" : "none"}
                  onClick={() => setCurrentLink(1)}
                >
                  <Link to="/admin/dashboard">
                    <MdSpaceDashboard />
                    <span> Dashboard</span>
                  </Link>
                </li>
                <li
                  className={currentLink === 2 ? "active" : "none"}
                  onClick={() => setCurrentLink(2)}
                >
                  <Link to="/admin/reviewsAdmin">
                    <MdRateReview />
                    <span> Reviews</span>
                  </Link>
                </li>
                <li
                  className={currentLink === 3 ? "active" : "none"}
                  onClick={() => setCurrentLink(3)}
                >
                  <Link to="/admin/roomsAdmin">
                    <IoIosCreate />
                    <span> Rooms</span>
                  </Link>
                </li>
                <li
                  className={currentLink === 4 ? "active" : "none"}
                  onClick={() => setCurrentLink(4)}
                >
                  <Link to="/admin/payments">
                    <TbReportMoney />
                    <span> Pagos </span>
                  </Link>
                </li>

                <li
                  className={currentLink === 5 ? "active" : "none"}
                  onClick={() => setCurrentLink(5)}
                >
                  <Link to="/admin/faqs">
                    <BsFillChatTextFill />
                    <span> FaQs</span>
                  </Link>
                </li>

                <li
                  className={currentLink === 6 ? "active" : "none"}
                  onClick={() => setCurrentLink(6)}
                >
                  <Link to="/admin/settings">
                    <IoSettings />
                    <span> Settings </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                localStorage.clear();
                logout();
              }}
            >
              <FiLogOut /> Cerrar Sesion
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
const Section = styled.section`
  background-color: dark;
  margin-top: 3.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 17%;
  }
  .top {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      gap: 1.3rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #fff9;
      }
    }
    .links {
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0em;
          margin: 1%;
          border-radius: 0 0.7rem 0.7rem 0.3rem;
          &:hover {
            background-color: black;
            a {
              color: #0dcaf0;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
            padding: 0.75em;
          }
        }
        .active {
          background-color: black;
          a {
            color: #0dcaf0;
          }
        }
      }
    }
  }
  .logout {
    display: flex;
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
`;
