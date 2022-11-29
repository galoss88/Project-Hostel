import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReview } from "../../Redux/actions/index.js";
//IMPORT DE REACT BOOTSTRAP --------------------------->>
import { IoIosStar } from "react-icons/io";
import "./Reviews.css";
//----------------------------------------------------------------------
export default function Reviews() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReview());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const reviews = useSelector((state) => state.reviews);
  function numberStar(number) {
    let stars = [0, 0, 0, 0, 0]
      .fill(1, 0, number)
      .map((s, i) => (s ? <IoIosStar key={i}></IoIosStar> : null));
    return stars;
  }
  function getFechaHora(createdAt) {
    let data = createdAt.replace(/\./g, "").slice(0, -7).split("T");
    let fecha = data[0];
    let hora = data[1];

    return <span>{fecha}</span>;
  }
  //console.log(reviews)
  //RENDER------------------------------------------------------------------->>
  return reviews.length ? (
    <div className='container1'>
      {reviews?.map((r) => {
        
        return (
          !r.status?
          <div key={r.id} className='reviews'>
            <div className="date">
              <h3>{r.client?.name ? r.client.name : "usuario anonimo"}</h3>
              <p className="fechaReview">
                <label>{numberStar(r.rating)}</label><label>({getFechaHora(r.createdAt)})</label>
              </p>
            </div>
            <p className="description">{r.description}</p>
          </div>
          :null
        )
      })}
    </div>
  ) : <h1 className="sinComentarios">Sin Comentarios Agregados :(</h1>
}
