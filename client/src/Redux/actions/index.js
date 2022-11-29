import axios from "axios";
export const POST_REVIEW = "POST_REVIEW";
export const GET_REVIEW = "GET_REVIEW";
export const GET_CLIENT = "GET_CLIENT";
export const FILTER_TYPE_ROOM = "FILTER_TYPE_ROOM";
export const GET_ROOMS = "GET_ROOMS";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const POST_OWNER = "POST_OWNER";
export const GET_OWNER = "GET_OWNER";
export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const GET_FAQ = "GET_FAQ";

// const URL = "https://dinamitahostel.herokuapp.com"; //heroku
// const URL = "https://hostelproject-production.up.railway.app" //railway
const URL = "http://localhost:4000"; //descomentar para hacer pruebas

//ACTION ROOMS ----------------------------------------------------------->>
export function getRooms() {
  return async function(dispatch) {
    let room = await axios.get(`${URL}/rooms`);
    return dispatch({
      type: GET_ROOMS,
      payload: room.data,
    });
  };
}

export function getAllRooms() {
  return async function(dispatch) {
    let room = await axios(`${URL}/rooms`);
    return dispatch({
      type: "GET_ALL_ROOMS",
      payload: room.data,
    });
  };
}
//ACTIONS REVIEWS ----------------------------------------------------------->>
export function getReview() {
  try {
    return async function(dispatch) {
      const dataDb = await axios.get(`${URL}/reviews`);
      dispatch({
        type: GET_REVIEW,
        payload: dataDb.data,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    console.log(e);
  }
}

export function deleteReview(headers, id, recOrDelete) {
  try {
    return async function(dispatch) {
      await axios.get(
        `${URL}/deletesAdmin/deleteReview/?id=${id}&recOrDelete=${recOrDelete}`,
        headers
      );
      dispatch({
        type: "DELETE_REVIEW",
      });
    };
    // return async function (dispatch) {
    //   await axios.delete(`${URL}/reviews/${id}`);
    //   dispatch({
    //     type:"DELETE_REVIEW",
    //     payload:"Eliminado"
    //   })
    // };
  } catch (e) {
    console.log(e);
  }
}

export function postReview(payload) {
  try {
    return async function(dispatch) {
      axios.post(`${URL}/reviews`, payload);
      return dispatch({ type: POST_REVIEW });
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    console.log("Fallo");
  }
}

//ACTIONS FILTROS---------------------------------------------------------------->>

export function sendFeedback(data) {
  try {
    return async function(dispatch) {
      let response = await axios.get(`${URL}/feedback${data}`);
      return response.data;
    };
  } catch (e) {
    console.log(e);
  }
}

export function filterTypeRoom(payloadOne, payloadTwo, payloadThree) {
  return {
    type: FILTER_TYPE_ROOM,
    payloadOne,
    payloadTwo,
    payloadThree,
  };
}

// export function filterPrice(payload){
//   console.log("Filter PRICE",payload)
//   return{
//     type:FILTER_PRICE,
//     payload

//   }
// }

//ACTIONS FILTROS---------------------------------------------------------------->>

//ACTION GET INFO CLIENT
export function getCLient(token) {
  try {
    return async function(dispatch) {
      const info = await axios.get(`${URL}/login/client`, {
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch({
        type: GET_CLIENT,
        payload: info.data,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (e) {
    console.log(e);
  }
}
export function getAllClients(token) {
  try {
    return async (dispatch) => {
      const allClients = await axios.get(`${URL}/allClients`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: GET_ALL_CLIENTS,
        payload: allClients.data,
      });
    };
  } catch (e) {
    console.log(e);
  }
}
export function postClient(body, headers) {
  return async () => {
    try {
      const res = await axios.post(`${URL}/login/userEdit`, body, headers);
    } catch (error) {
      console.log(error);
    }
  };
}

export function setClient(token) {
  try {
    return async function() {
      let res = await axios.get(`${URL}/login/setClient`, {
        headers: { authorization: `Bearer ${token}` },
      });
      localStorage.setItem("IDUser", res.data.id);
    };
  } catch (e) {
    console.log(e);
  }
}

export function getRolUser(token) {
  try {
    return async function() {
      let res = await axios.get(`${URL}/rol`, {
        headers: { authorization: `Bearer ${token}` },
      });
      localStorage.setItem("Rol", res.data.rol[0]);
    };
  } catch (e) {
    console.log(e);
  }
}

export function getStatus(token) {
  try {
    return async function() {
      let res = await axios.get(`${URL}/login/status`, {
        headers: { authorization: `Bearer ${token}` },
      });
      localStorage.setItem("status", res.data);
    };
  } catch (e) {
    console.log(e);
  }
}

export function setStatus(token, body) {
  try {
    return async function() {
      let res = await axios.post(`${URL}/login/banner`, body, {
        headers: { authorization: `Bearer ${token}` },
      });
    };
  } catch (e) {
    console.log(e);
  }
}

// ---------------------------------------------------------
export function postOwner(payload, headers) {
  return async function() {
    const { data } = await axios.post(`${URL}/owner/post`, payload, headers);
    return data;
  };
}
export function getOwner(token) {
  return async function(dispatch) {
    try {
      let { data } = await axios.get(`${URL}/owner/get`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return dispatch({
        type: GET_OWNER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOwnerSp() {
  return async function(dispatch) {
    try {
      let { data } = await axios.get(`${URL}/owner/gethome`);
      return dispatch({
        type: GET_OWNER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getRoomDetail(id) {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${URL}/getroomdetail?id=${id}`);
      return dispatch({
        type: "GET_ROOM_DETAIL",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllCountries() {
  return async function(dispatch) {
    try {
      let { data } = await axios.get(`${URL}/countries`);
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRent(id) {
  return async function(dispatch) {
    try {
      let res = await axios.get(`${URL}/rent?id=${id}`);
      return dispatch({
        type: "GET_RENT",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const createRoom = (payload) => async () => {
  let res = await axios.post(`${URL}/rooms`, payload);
  return {
    type: "CREATE_ROOM",
    res,
  };
};

export function deleteRoom(headers, id) {
  try {
    return async function(dispatch) {
      await axios.get(`${URL}/deletesAdmin/deleteRoom/?id=${id}`, headers);
      dispatch({
        type: "DELETE_ROOM",
        payload: "eliminado logico",
      });
    };
  } catch (e) {
    console.log(e);
  }
}

export function changeStatusRoom(headers, id, statusRoom) {
  try {
    return async function(dispatch) {
      await axios.get(
        `${URL}/changeStatusRoom/?id=${id}&statusRoom=${statusRoom}`,
        headers
      );
      dispatch({
        type: "CHANGE_STATUS",
        payload: "status changed",
      });
    };
  } catch (e) {
    console.log(e);
  }
}

// export function activeRoom(headers, id){
//   try{
//     return async function(dispatch){
//       await axios.get(`${URL}`)
//     }
//   }
// }

export function inactiveRooms(payload) {
  return {
    payload,
    type: "INACTIVE_ROOMS",
  };
}
//ACTIONS RENTS ----------------------------------------------------------->>
export function getRents(token) {
  try {
    return async function(dispatch) {
      const json = await axios.get(`${URL}/rents`, {
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch({
        type: "GET_RENTS",
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}
// FAQs ADMIN------------------------------------------------
export function getFaq() {
  try {
    return async function(dispatch) {
      const response = await axios.get(`${URL}/faq`);
      dispatch({
        type: GET_FAQ,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function postFaq(token, payload) {
  try {
    return async function(dispatch) {
      const response = await axios.post(`${URL}/faq/new`, payload, {
        headers: { authorization: `Bearer ${token}` },
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function delteFaq(token, id) {
  try {
    return async function(dispatch) {
      const response = await axios.get(`${URL}/faq/deleteFaq?id=${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export function filterRents(payloadOne, payloadTwo) {
  return {
    type: "FILTER_RENTS",
    payloadOne,
    payloadTwo,
  };
}

export function logicalDraft(id, token) {
  try {
    return async function() {
      const json = await axios.get(`${URL}/rents/draft?id=${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
    };
  } catch (error) {
    return error;
  }
}
