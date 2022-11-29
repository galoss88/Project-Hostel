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
  const {logout} = useAuth0();
  return (
    <div>
      <div className="container">
        <Section>
          {/* //TOP-------------------------------------------->> */}
          <div className="top">
            <div className="brand">
              <img
                className="logo"
                src={logo}
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              />
              <span>Project Hostel</span>
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
          <div style={{display: "flex", justifyContent: "center" }} >
            <button className="btn btn-outline-danger"
            onClick={() =>{
              localStorage.clear();
              logout()
            }}
            >
              <FiLogOut/> Logout
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
const Section = styled.section`
  position: fixed;
  width: 100%;
  left: 0.5%;
  background-color: dark;
  margin-top: 70px;
  height: 1vh;
  width: 28vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 3rem;
  .logo {
    width: 60px;
  }
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    .toggle {
      display: none;
    }
    .brand {
      margin-left: 1%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      gap: 1.3rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #fff9;
        font-family: "Permanent Marker", cursive;
      }
    }
    .links {
      width: 70%;
      ul {
        width: 83%;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          width: 95%;
          padding: 0.6rem 1rem;
          margin: 1%;
          border-radius: 0.6rem;
          &:hover {
            background-color: white;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: white;
          a {
            color: black;
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
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;
