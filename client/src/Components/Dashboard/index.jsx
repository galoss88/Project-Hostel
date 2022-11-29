import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.module.css'

export default function Dashboard(){
    return(
        <div className= {`${style.bgWhites} container my-3`} >
        <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 my-4">
                <h2>Alta</h2>
                <form>                                    
                    <select className="form-select" aria-label="Default select example">
                        <option >Tipo de habitacion</option>
                        <option value="1">Privada</option>
                        <option value="2">Compartida</option>
                    </select>
                    <div className="mb-3">
                        <label htmlFor ="cama" className="form-label">Cantidad de camas</label>
                        <input type="number" className="form-control" id="cama" placeholder="8" />
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" 
                        id="flexSwitchCheckChecked" defaultChecked />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        Estado de la habitacion</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-success block">Guardar</button>
                        <button className="btn btn-secondary" >Limpiar</button>
                    </div>
                </form>
            </div>

            <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 my-4">
                <h2>Listado de habitaciones</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tipo</th>
                            <th>Camas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Privada</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Privada</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Compartida</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Compartida</td>
                            <td>6</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>        
    </div>
    )
}