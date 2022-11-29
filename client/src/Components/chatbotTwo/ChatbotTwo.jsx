import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import Faq from "./Faq";
import Reservas from "./Reservas";
import ReviewChat from "./ReviewChat"
import Contactanos from "./Contactanos";
import RedesSociales from "./RedesSociales";
import MensajeInicial from "./MensajeInicial";
export default function BotChat() {
  const theme = {
    background: "#292B2C",
    fontFamily: 'Comic Sans MS',
    headerBgColor: "#0275D8",
    headerFontColor: "#FFFFFF",
    headerFontSize: "20px",
    botBubbleColor: "#0275D8",
    botFontColor: "#FFFFFF",
    userBubbleColor: "#5F5F5F",
    userFontColor: "#fff",
  };
  const steps = [
    {
      id: "0",
      message: "Bienvenido a Project Hostel. Por favor indiquenos su nombre.",
      trigger: "preguntaNombre",
    },
    {
      id: "preguntaNombre",
      user: true,
      validator: (value) => {
        if (/^[ a-zA-Z ]{5,30}$/.test(value) ) {
          return true;
        } else {
          return "Solo letras y almenos 5 caracteres";
        }
      },
      trigger: "respuesta-nombre",
    },
    {
      id: "respuesta-nombre",
      component:<MensajeInicial></MensajeInicial>,
      asMessage:true,
      trigger: "seleccionOpcion",
    },
    // {
    //   id: "respuesta-nombre",
    //   message: `Hola {previousValue}, Bienvenido a Project Hostel!, en que le podemos ayudar?`,
    //   trigger: "seleccionOpcion",
    // },
    {
      id: "seleccionOpcion",
      message: "Seleccione la opcion",
      trigger: "opciones",
    },
    //OPCIONES -------------------------------------------------------->>
    {
      id: "opciones",
      options: [
        { value: "reservas", label: "Reservas", trigger: "reservas" },
       
        { value: "reviews", label: "Reviews", trigger: "mostrar-reviews" },
        {
          value: "contactanos",
          label: "Contactanos",
          trigger: "mostrar-contactanos",
        },
        {
          value: "faq",
          label: "Preguntas Frecuentes",
          trigger: "mostrar-preguntasFrecuentes",
        },
        {
          value: "redesSociales",
          label: "Nuestras redes sociales",
          trigger: "mostrar-redesSociales",
        },
        { value: "salir", label: "Salir", trigger: "salirBot" },
      ],
    },
    //------------------------------------------------------------------------------
    {
      id: "reservas",
      component: <Reservas />,
      asMessage: true,
      trigger: "volver",
    },
    {
      id: "mostrar-comoLlegar",
      // message: "Mostrar preguntas frecuentes",
      // component:<Contacto/>,
      message: "Mostrar como llegar",
      trigger: "volver",
    },
    {
      id: "mostrar-reviews",
      component: <ReviewChat />,
      asMessage: true,
      trigger: "volver",
    },
    //CONTACTANOS
    {
      id: "mostrar-contactanos",
      component: <Contactanos />,
      asMessage: true,
      trigger: "volver",
    },

    //PREGUNTAS FRECUENTES
    {
      id: "mostrar-preguntasFrecuentes",
      component: <Faq />,
      asMessage: true,
      trigger: "volver",
    },
    //Redes sociales
    {
      id: "mostrar-redesSociales",
      component: <RedesSociales />,
      asMessage: true,
      trigger: "volver",
    },
    {
      id: "volver",
      options: [
        { value: "volver", label: "Volver a opciones", trigger: "opciones" },
      ],
    },
    
    {
      id: "salirBot",
      message: "Espero le haya sido de ayuda!. Saludos desde Dinamita Hostel",
      end: true,
    },
  ];
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps}></ChatBot>
      </ThemeProvider>
    </React.Fragment>
  );
}
