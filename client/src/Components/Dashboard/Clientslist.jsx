import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { setStatus, getAllClients } from '../../Redux/actions/index';
import {socket} from '../../App';

export default function Clientlist() {
    const {getAccessTokenSilently} = useAuth0();
    const clientes = useSelector((state)=>state.allClients)
    const dispatch = useDispatch();

    useEffect(()=>{
      getAccessTokenSilently().then(token => {

        socket.on('newUserLogin', async (data)=>
        await dispatch(getAllClients(token)))
      })
    },[])

    
   async function handleStatus (e, state){
      socket.emit('userBanned',({user: e, state: state}))
        // const token = await getAccessTokenSilently()
        // await dispatch(setStatus(token, {status:state, id:e.target.id}))
        // dispatch(getAllClients(token))
    }

    return(
        <div className="container-fluid mt-3">
        <div className="mx-auto m-3 table-responsive-lg ">
            <h2 className="">Usuarios</h2>
          <table className="table table-dark table-striped table align-middle table table-hover text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Desactivar</th>
                <th>Activar</th>
                <th>Estado</th>
                <th>Conectado</th>
              </tr>
            </thead>
            <tbody>
              {clientes?.map((r) => {
                return (
                  <>
                    <tr key={r.id}>
                      <th scope="row">{r.id}</th>
                      <td>
                        {r.name}
                      </td>
                      <td>
                        {r.email}
                      </td>
                      <td className="align-middle">
                        <button
                          type="button"
                          className="btn btn-danger"
                          id={r.id}
                          onClick={e=>  handleStatus(r.email, 'disabled')}

                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                      </td>
                      <td className="align-middle">
                        <button
                          type="button"
                          className="btn btn-success"
                          id={r.id}
                          onClick={e=> handleStatus(r.email, "active",)}
                        >
                          Recuperar
                        </button>
                      </td>
                      <td className="align-bottom">
                        <h3 className="m-2">
                          <span
                            className={ r.status == "active" ? "badge bg-success" : "badge bg-danger"
                            }
                          >
                            {r.status}
                          </span>
                        </h3>
                      </td>
                      <td>{r.con}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            
          </table>
          
        </div>
      </div>
    )
}