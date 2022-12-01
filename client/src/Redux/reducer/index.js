import {
  GET_REVIEW,
  POST_REVIEW,
  GET_CLIENT,
  FILTER_TYPE_ROOM,
  GET_ALL_COUNTRIES,
  POST_OWNER,
  GET_OWNER,
  GET_ALL_CLIENTS,
  GET_FAQ,
  FORGET
} from "../actions/index.js";

const initialState = {
  rooms: [],
  allRooms: [],
  reviews: [],
  client: [],
  roomdetail: [],
  countries: [],
  owner: [],
  rent: [],
  allClients: [],
  rents: [],
  faq:[]
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_ALL_ROOMS":
      return{
        ...state,
        allRooms: action.payload
      }
    case "GET_ROOMS": {
      if (!localStorage.getItem("filtros")) {
        return {
          ...state,
          rooms: action.payload,
          allRooms: action.payload,
        };
      }
      if (localStorage.getItem("filtros")) {
        return {
          ...state,
          rooms: JSON.parse(localStorage.getItem("filtros")),
        };
      }
    }

    case POST_REVIEW: {
      return {
        ...state,
      };
    }
    case GET_OWNER: {
      return {
        ...state,
        owner: action.payload,
      };
    }
    case POST_OWNER: {
      return {
        ...state,
      };
    }
    case GET_REVIEW: {
      return {
        ...state,
        reviews: action.payload,
      };
    }
    case "DELETE_REVIEW": {
      return {
        ...state,
      };
    }
    case "DELETE_ROOM": {
      return {
        ...state,
      };
    }
    case GET_ALL_CLIENTS: {
      return {
        ...state,
        allClients: [...action.payload],
      };
    }
    case FILTER_TYPE_ROOM: {
      let filterRoom = state.allRooms;
      let roomType;
      //FILTRO POR TIPO DE HABITACION Y POR TIPO DE BAÑO
      if (action.payloadOne || action.payloadTwo) {
        if (action.payloadOne && action.payloadTwo) {
          roomType =
            action.payloadOne === "roomPrivate"
              ? filterRoom.filter((e) => e.type.type === "Privado")
              : filterRoom.filter((e) => e.type.type === "Publico");

          roomType =
            action.payloadTwo === "batchroomPrivate"
              ? roomType.filter((e) => e.bathroom === true)
              : roomType.filter((e) => e.bathroom === false);
        } else {
          if (action.payloadTwo) {
            roomType =
              action.payloadTwo === "batchroomPrivate"
                ? filterRoom.filter((e) => e.bathroom === true)
                : filterRoom.filter((e) => e.bathroom === false);
          } else {
            roomType =
              action.payloadOne === "roomPrivate"
                ? filterRoom.filter((e) => e.type.type === "Privado")
                : filterRoom.filter((e) => e.type.type === "Publico");
          }
        }
      } else {
        if (!action.payloadOne && !action.payloadTwo && action.payloadThree) {
          roomType = state.rooms;
        }
      }

      //SI ME LLEGA PAYLOAD y no me llegan type y typbatchroom PARA ORDENAR POR PRECIO. SE LO APLICO A LOS FILTROS ANTERIORES
      if (action.payloadThree) {
        if (action.payloadThree === "asc") {
          roomType = roomType.sort((a, b) => {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            return 0;
          });
        } else {
          roomType = roomType.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            }
            if (a.price < b.price) {
              return 1;
            }
            return 0;
          });
        }
      }
      //GUARDO ESTADO REDUX EN LOCALSTORAGE

      localStorage.setItem("filtros", JSON.stringify(roomType));
      return {
        ...state,
        rooms: [...roomType],
      };
    }

    case GET_CLIENT: {
      return {
        ...state,
        client: action.payload,
      };
    }
    case "GET_ROOM_DETAIL": {
      return {
        ...state,
        roomdetail: action.payload,
      };
    }
    case "GET_RENT": {
      return {
        ...state,
        rent: action.payload,
      };
    }
    case "INACTIVE_ROOMS": {
      let activeRoom = state.allRooms;
      activeRoom.filter((room) => room === false);
      return {
        ...state,
        rooms: activeRoom,
      };
    }
    case "GET_RENTS": {
      const activeRents = action.payload
      let b = activeRents.filter(e => e.status === false)
      if(!localStorage.getItem("filters")) {
        return{
          ...state,
          rents: b
        }
      }
      if(localStorage.getItem("filtros")) {
        return{
          ...state,
          rents: JSON.parse(localStorage.getItem("filters")),
        }
      }
        
      
      
    }
    case GET_FAQ: {
      return {
        ...state,
        faq: action.payload,
      };
    }

    case "FILTER_RENTS": {
      const allRents = state.rents

      //FILTRO LAS RENTS SEGÚN EL MES
      function filter () {
        const boolean = []

        const dateInReduced = allRents.map(e => e.dateReserva.slice(0, 7))

        dateInReduced.forEach(e => {
          if(e === action.payloadOne) {
            boolean.push(1)
          } else {
            boolean.push(0)
          }
        })

        const rentFilter = []
        for(let i = 0; boolean.length > i; i++) {
          if(boolean[i] === 1) {
            rentFilter.push(allRents[i])
          }
        }
        return rentFilter
      }
      //ORDENO LAS RENTS SEGÚN LA DATE
      function sort(algo) {
        let sortedArr = action.payloadTwo === "asc" ?
        algo.sort(function(a, b) {
          var c = new Date(a.dateReserva).getTime();
          var d = new Date(b.dateReserva).getTime()
          if(c > d) {
            return 1
          }
          if(d > c) {
            return -1
          }
          return 0
        }) :
        algo.sort(function(a, b) {
          var c = new Date(a.dateReserva).getTime();
          var d = new Date(b.dateReserva).getTime()
          if(c > d) {
            return -1
          }
          if(d > c) {
            return 1
          }
          return 0 
        })
        return sortedArr
      }
      
      if(action.payloadOne && !action.payloadTwo) {
        let cosa = filter()
        localStorage.setItem("filters", JSON.stringify(cosa))
        return {
          ...state,
          rents: cosa
        }
      } else if(!action.payloadOne && action.payloadTwo) {
        let cosa2 = sort(allRents)
        localStorage.setItem("filters", JSON.stringify(cosa2))
        return {
          ...state,
          rents: cosa2
        }
      } else if(action.payloadOne && action.payloadTwo) {
        let aux = filter()
        let cosa3 = sort(aux)
        localStorage.setItem("filters", JSON.stringify(cosa3))
        return {
          ...state,
          rents: cosa3
        }
      }
  }
  case FORGET:
    return{
      ...state,
      roomdetail: []
    }
    default:
      return state;
  }
}
