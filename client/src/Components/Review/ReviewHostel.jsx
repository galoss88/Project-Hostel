import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import BOOTSTRAP --------------------------------------------->>
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { IoIosStar } from "react-icons/io";
import style from "../../Styles/ReviewHostel.module.css";
import { postReview } from "../../Redux/actions/index.js";
import Swal from "sweetalert2";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function RatingBootstrap() {
  const client = useSelector((state) => state.client);
  // eslint-disable-next-line no-unused-vars
  const [rating, setRating] = useState([1, 2, 3, 4, 5]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  // const [description, setDescription] = useState("");

  const [input, setInput] = useState({
    usuario: client.name,
    rating: 0,
    description: "",
  });
  const dispatch = useDispatch();

  function handleClick(index) {
    setCurrent(index);
    setInput({ ...input, rating: index });
  }
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (input.rating === 0) {
      return input.rating === 0
        ? Swal.fire({
            icon: "warning",
            title: "Oops...",
            text:
              "Por favor, seleccione un número de estrellas de acuerdo a su experencia en Project Hostel.",
          })
        : null;
    } else {
      if (!client.name) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Por favor, Complete sus datos antes de dejar una reseña.",
        });
        return navigate("/clientEdit");
      }
      dispatch(postReview(input));
      setInput({ usuario: client.name, rating: 0, description: "" });
      setCurrent(0);
      setRating([1, 2, 3, 4, 5]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Gracias por darnos su opinion. ¡Que tenga un buen dia!",
      });
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="container ">
        <div className="container d-flex justify-content-center  ">
          {rating.map((r, index) => (
            <IoIosStar
              className={r <= current ? style.yellow : style.grey}
              key={index}
              name="rating" //No acepta name
              value={current}
              onClick={() => handleClick(r)}
            ></IoIosStar>
          ))}
        </div>

        <br />
        <FloatingLabel
          name="description"
          controlId="floatingTextarea"
          label="Comments"
          className="mb-3 d-flex mx-auto form-floating gap-2"
          onChange={(e) => handleChange(e)}
          style={{ height: "100px", width: "600px" }}
        >
          <Form.Control
            as="textarea"
            value={input.description}
            name="description"
            placeholder="Leave a comment here"
            style={{ height: "120px" }}
          />
          <div className="mx-auto mt-5 m-1">
            <Button type="submit" value="Enviar" class="btn btn-primary btn-md">
              Enviar
            </Button>
          </div>
        </FloatingLabel>
      </div>
    </form>
  );
}
// mx-auto d-flex justify-content-start w-50
export default withAuthenticationRequired(RatingBootstrap, {
  onRedirecting: () => (
    <div>
      <h1>No estas registrado para esto....</h1>
    </div>
  ),
});
