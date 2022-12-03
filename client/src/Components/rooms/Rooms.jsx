import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import { getRooms } from "../../Redux/actions/index.js";
import Paginate from "../Paginate/Paginate";
import RoomCard from "./RoomCard.jsx";
import Filters from "./Filters";

export default function Rooms() {
  const dispatch = useDispatch();
  //Almacenamos estado rooms de redux en variable allRooms ---------------------------------------->>
  let allRooms = useSelector((state) => state.allRooms);
  let rooms = useSelector(state=>state.rooms)
  const [page, setPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(7);
  const lastPage = page * roomsPerPage;
  const firstPage = lastPage - roomsPerPage;
  const currentPage = JSON.parse(localStorage.getItem("filtros"))?.slice(firstPage, lastPage)

  const paginate = (pages) => {
    setPage(pages);
  };

  //Se carga base de datos al entrar a ROOMS!!---------------------------------------------->> Carga BASE DE DATOS
  useEffect(() => {
    dispatch(getRooms());
  }, []);

  //DATA ES TRUE CUANDO HAGO CAMBIOS EN LOS FILTROS ---------------------------->>
  const [data, setData] = useState(true);

  //VARIABLE CON LAS ROOMS ACTUALES QUE SE VAN A RENDERIZAR !!! ------------->>
  let roomsCurrent = currentPage|| allRooms.slice(firstPage, lastPage);

  //-------------------------------------------------------------------------
  //Renderizo componente cada vez que obtengo informacion de localStorage!!.Se ejecuita ante cada cambio en data, que se cambia a true al hacer un SUBMIT de los filtros
  useEffect(() => {
    // getData();
    JSON.parse(localStorage.getItem("filtros"));
    setData(false);
  }, [data]);

  //--------------------------------------------------------------RENDER---------------------------------------------------------->> <<<<<<<render>>>>>>

  return (
    <div>
      <Filters getRooms={getRooms} setData={setData} paginate={paginate} />
      <div className="container">
        <div className="row">
          {roomsCurrent &&
            roomsCurrent.map((e) => {
              return (
                <div key={e.id} className="view overlay w-100">
                  <RoomCard
                    beds={e.beds}
                    description={e.description}
                    image={e.image}
                    bathroom={e.bathroom}
                    id={e.id}
                    type={e.type?.id}
                    price={e.price}
                    beds_avalaibles={e.beds_avalaibles}
                    status={e.status}
                  />
                  
                </div>
              );
            })}

          <div className="row mx-auto">
            <Paginate
              roomsPerPage={roomsPerPage}
              allRooms={rooms?.length}
              paginate={paginate}
              page={page}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
