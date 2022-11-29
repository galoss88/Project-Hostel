import React, { useEffect } from "react";
import {DateRangePicker} from "react-date-range"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomDetail } from "../../Redux/actions";
import { parseISO } from "date-fns";
export default function Datepicker({llegada, salida}){
console.log('toy en picker', llegada);
    
     let dateArray = [];

   var hora = new Date();
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [departureDate, setdepartureDate] = useState(new Date());

  function getDates(startDate, stopDate) {
    var currentDate = moment(startDate);
    var stopDatee = moment(stopDate);
    while (currentDate <= stopDatee) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }
    llegada = new Date(llegada.split("-").reverse().join("-"));
    salida = new Date(salida.split("-").reverse().join("-"));

  let entrada = "2022-11-20";
  let salido = "2022-11-23";

  getDates(entrada, salido)

  
    dateArray = dateArray.map((d) =>{
      return new Date(d)
    })

    console.log(dateArray)
 
        console.log(hora);
    const selectionRange = {
        startDate: arrivalDate,
        endDate: departureDate,
        key: 'selection',
    }
    const fechaprueba = "2022-11-25"
    const handleSelect = (e)=>{
        setArrivalDate(e.selection.startDate);
        setdepartureDate(e.selection.endDate);
        console.log("entrada", arrivalDate);
    }
    return(
        <div>
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                minDate={new Date}
                disabledDates={dateArray}
                // excludeDates={disableFinal}
                // minDate={fecha}
                // selected={false}
                // onChange={onChange}
                // startDate={startDate2}
                // endDate={endDate2}
                // selectsRange
                // inline
                // onClick={() => disableBoton(fechaBotonArray, fechaBotonMoment)}
                // monthsShown={3}
            />
        </div>
    )
}