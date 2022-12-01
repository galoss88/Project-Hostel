import React from "react"
 
export default function PaginationPayments({ paymentsPerPage, allRents, paginado, currentPage, totalPages }) {
    const pageNumbers = []
    
    for(let i=1; i<=Math.ceil(allRents.length/paymentsPerPage); i++) {
        pageNumbers.push(i)
    }
 
    const nextHandler = () => {
        if(currentPage < totalPages) {
        return paginado(currentPage + 1)}
    }
    const prevHandler = () => {
        if(currentPage > 1)
        return paginado(currentPage - 1)
    }
    
    return (
        <div className="container px-0 bg-black mt-2 ">
        <nav className="nav nav-pills d-flex justify-content-center mt-3 d-md-flex d-sm-table-cell">
            <li className="nav-item mx-1">
            <button className="nav-item btn btn-dark ">
                <a onClick={() => prevHandler()}>Prev</a>
            </button>
            </li>
            <li className="nav-item me-2 justify-content-center">
            <ul>
                {pageNumbers &&
                    pageNumbers.map(number =>
                        currentPage === number ?
                        (
                            <button key={number} className="nav-item btn btn-dark mx-1">
                                <a onClick={() => paginado(number)}>{number}</a>
                            </button>
                        ) :
                        (
                            <button key={number} className="nav-item btn btn-dark mx-1">
                                <a onClick={() => paginado(number)}>{number}</a>
                            </button>
                        )
                    )
                }
               
            </ul>
            </li>

            <li className="nav-item ms-4 col-1">
            <button className="nav-item btn btn-dark">
                <a onClick={() => nextHandler()}>Next</a>
            </button>
            </li>
           
        </nav>
        </div>
    )
}
