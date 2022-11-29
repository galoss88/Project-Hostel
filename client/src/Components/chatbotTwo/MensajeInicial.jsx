import React from 'react'

export default function MensajeInicial(props) {
    const {steps}=props
    const {preguntaNombre} = steps
    const nombreCurado = preguntaNombre.value.trim().split(" ").map(e=>e[0].toUpperCase()+e.slice(1)).join(" ")
  return (
    <div>
        <p>Hola {nombreCurado}, Bienvenido a Dinamita Hostel!!!</p>
        <p>En que le podemos ayudar?</p>

      
    </div>
  )
}
