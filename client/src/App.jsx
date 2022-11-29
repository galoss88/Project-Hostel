import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/home";
import Navbars from "./Components/navbar/navbar";
import ReviewHostel from "./Components/Review/ReviewHostel.jsx";
import Rooms from "./Components/rooms/Rooms";
import Contact from "./Components/Contact/index";
import FeedBack from "./Components/feedback/Feedback";
import RoomDetail from "./Components/RoomDetail/RoomDetail";
import About from "./Components/about/about.jsx";
import ClientEdit from "./Components/ClientEdit";
import OwnerCrud from "./Components/OwnerCrud";
import Create from "./Components/Dashboard/Create";
//dashboard --------------------------------------------------------->>
//import styled from "styled-components";
import PanelAdmin from "./Components/Dashboard/PanelAdmin";
import ReviewAdmin from "./Components/Dashboard/ReviewAdmin.jsx";
import Payments from "./Components/Dashboard/Payments";

import { io } from "socket.io-client";

// export const socket = io("http://localhost:4000");
export const socket = io("https://hostelproject-production.up.railway.app");
//-------------------------------------------------------------------->>
//chatbot -------------------------------------------------------------->>

import ButtonChat from "./Components/chatbotTwo/ButtonChat";

//-------------------------------------------------------------------->>
function App() {
  return (
    <>
      <Navbars></Navbars>
      
       {/* BOT CHAT */}
      <ButtonChat></ButtonChat>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/reviewHostel" element={<ReviewHostel />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<FeedBack />} />
        <Route path="/roomdetail/:id" element={<RoomDetail />} />
        <Route path="/clientEdit" element={<ClientEdit />} />
        <Route path="/createRoom" element={<Create />} />
        <Route path="/payments" element={<Payments />}></Route>
      </Routes>
      <Routes>
        <Route path="/admin/*" element={<PanelAdmin />}>
          <Route path="reviewsAdmin" element={<ReviewAdmin />}></Route>
        </Route>
      </Routes>
    </>
  );
}
// const Div = styled.div``;
export default App;
