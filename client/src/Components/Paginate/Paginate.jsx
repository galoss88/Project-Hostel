import React from "react";
import "./Paginate.css";

const paginate = ({roomsPerPage, allRooms, paginate, page}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(allRooms / roomsPerPage); i++) {
    pages.push(i);
  }
  const prevHandler = () => {
    if (page <= 1) return;
    paginate(page - 1);
  };

  const nextHandler = () => {
    if (page >= pages.length) return;
    paginate(page + 1);
  };

  return (
    <div className="pagination">
      <button className="prev" onClick={prevHandler}>
        Anterior
      </button>
      <div className="d-flex">
        {pages?.map((num) => (
          <button
            key={num}
            onClick={() => paginate(num)}
            className={num === page ? "active" : ""}
          >
            {num}
          </button>
        ))}
      </div>
      <button className="next" onClick={nextHandler}>
        Siguiente
      </button>
    </div>
  );
};

export default paginate;
