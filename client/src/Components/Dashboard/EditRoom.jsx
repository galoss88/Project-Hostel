import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../Redux/actions";
import "./EditRoom.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteRoom, changeStatusRoom } from "../../Redux/actions";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import Button from "react-bootstrap/esm/Button";

const Edit = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch, estado]);

  useEffect(() => {
    setEstado(true);
  }, [estado]);

  const handleDelete = async (room) => {
    const token = await getAccessTokenSilently();
    const authorization = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await dispatch(deleteRoom(authorization, room));
    dispatch(getAllRooms());
  };

  const alerta = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const deleteAlert = (room) => {
    alerta
      .fire({
        title: "Esta seguro de querer eliminar la habitacion?",
        text: "Este cambio no se podra revertir",
        showCancelButton: true,
        confirmButtonText: "Si, elminar!",
        cancelButtonText: "No, gracias!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete(room);
          alerta.fire(
            "Habitacion eliminada!",
            "Se ha eliminado correctamente",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alerta.fire(
            "La habitacion NO se elimino!",
            "Los datos siguen a salvo!",
            "error"
          );
        }
      });
  };

  const handleChangeStatus = async (room, statusRoom) => {
    const token = await getAccessTokenSilently();
    const authorization = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    await dispatch(changeStatusRoom(authorization, room, statusRoom));
    await dispatch(getAllRooms());
  };

  const rooms = useSelector((state) => state.allRooms);
  const ordernar = () => {
    let ordenado = rooms.sort((a, b) => {
      if (a.id > b.id) return +1;
      if (a.id < b.id) return -1;
      return 0;
    });
    return ordenado;
  };

  return (
    <div className="table-container">
      <Table striped bordered hover variant="dark" className="col-md-7 bg-dark">
        <thead>
          <tr>
            <th>ID: </th>
            <th>Image: </th>
            <th>Description: </th>
            <th>Camas disponibles: </th>
            <th>Status: </th>
            <th>Activo/Inactivo: </th>
            <th>Borrar: </th>
          </tr>
        </thead>
        <tbody>
          {ordernar().map((room, index) => (
            <tr key={index}>
              <td>{room.id}</td>
              <td>
                <img
                  src={room.image ? room.image[0] : room.image.map(el => el.url)}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                  alt=""
                ></img>
              </td>
              <td>{room.description}</td>
              <td>{room.beds_avalaibles}/{room.beds}</td>
              <td>{room?.status ? "inactivo" : "activo"}</td>
              <td>
                <label className="botoncito">
                  <input
                    key={index}
                    type="checkbox"
                    defaultChecked={room.status}
                    onClick={async () =>
                      await handleChangeStatus(
                        room.id,
                        room.status ? "activo" : "inactivo"
                      )
                    }
                  ></input>
                  <span
                    style={{ justifyContent: "center", alingItems: "center" }}
                    className="deslizadora"
                  ></span>
                </label>
              </td>
              <td className="borrar">
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => {
                    deleteAlert(room.id);
                  }}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Edit;
