import React from "react";
import Footer from "../Layout/Footer";
import Carousel from "react-bootstrap/Carousel";
import Review from '../Review/Reviews';
import "./Home.css";
import { Link } from "react-router-dom";
import { addObserver } from "./observer";
import { getOwner,getOwnerSp } from "../../Redux/actions";
import {useDispatch, useSelector} from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import wave from './wave.svg';
import Servicios from "./servicios/Servicios";
import {socket} from '../../App';
import { getRolUser } from "../../Redux/actions";

const Home = () => {
  const {isAuthenticated, getAccessTokenSilently, user} = useAuth0();
  const info = useSelector(state => state.owner);
  const dispatch = useDispatch()

  const ref1 = React.useRef();
  const ref2 = React.useRef();
  const ref3 = React.useRef();

  React.useEffect(()=>{
    addObserver(ref1.current)
    addObserver(ref2.current)
    addObserver(ref3.current)
    if(isAuthenticated) {
        socket.emit('userConected', {user: user.email, rol: user.rol[0]})
    }
  })

  React.useEffect(() => {
    if (!info.length) dispatch(getOwnerSp())
  }, [dispatch]);

  return (
    <div className='home-container'>      
    <div className="home-container row ">
      <Carousel className="carousel w-100 m-auto ">
        <Carousel.Item>
          <div className="xd">
            <img
              // src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Hostel_Dormitory.jpg"
              src ="https://img.besthqwallpapers.com/Uploads/6-11-2017/27286/interior-of-hotel-room-modern-design-brown-tone-hotel-room-room-for-three.jpg"
              alt="first-item"
            />
            <h1 className="Bienvenido">Bienvenidos al {info.hostelName}</h1>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="xd2">
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-s/15/bc/d3/19/ideal-social-hostel.jpg"
              alt="second-item"
            />
            <p className="infoHome">{info.aboutUs}</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="xd3">
            <img
              src="https://www.kayak.com.ar/rimg/kimg/db/d7/dc765dd2449cac1c.jpg?width=1366&height=768&crop=true"
              alt="third-item"
            />
            <div className="infoHome2">
              <ul>
                <p className="contactHome">Contactanos</p>
                <li>
                  <img 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F128%2F281%2F281769.png&f=1&nofb=1&ipt=ec0a92aa547629d49b3e6694c5503cdc80d9375a816b1831e08b774ed24df9e2&ipo=images" 
                    alt="logoGmail" 
                  />
                  <a href="#" target="_blank">Correo</a></li>
                <li>
                  <img 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogovector.net%2Fwp-content%2Fuploads%2F2011%2F11%2Ffacebook-f-logo-195x195.png&f=1&nofb=1&ipt=28f161af0961a8646ffa8fed1ec3f3f5ed73a8e77d17060e17876dc360db8976&ipo=images" 
                    alt="logo Facebook" 
                    />
                  <a href={info.facebook} target="_blank">Facebook</a>
                </li>
                <li>
                  <img 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstore-images.s-microsoft.com%2Fimage%2Fapps.31617.13655054093851568.f2bf9430-60d7-4569-a50d-0f21c9ade6b3.c563d383-997d-4da1-9def-d7200e3547f8%3Fw%3D180%26h%3D180%26q%3D60&f=1&nofb=1&ipt=b660687cd18505323f7a681a174c54032a42fd21e34a5acade050c113f9244f7&ipo=images" 
                    alt="LogoWhatsapp" 
                  /><a href="#" target="_blank">WhatsApp</a></li>
                <li><Link to='contact'>Preguntas Frecuentes</Link></li>
              </ul>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      </div>
      <div className="info">
          <div className="imagenDemo">
            <div className="demo1 demo11 " ref={ref1}>
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo.png?alt=media&token=9e5301a3-3ef3-453b-b9a6-47c47f2cdf71"
                alt="collage-1" 
              />
              <div className="data">
                <p>SOBRE NOSOTROS</p>
                <p>{info.aboutUs}</p>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium omnis at dolorum amet quaerat voluptatem laboriosam. Assumenda deleniti delectus non soluta sequi quis saepe in, facere dicta laudantium illum quisquam doloribus incidunt qui natus esse, earum unde, facilis deserunt voluptatibus voluptates dolores provident magni? Provident pariatur ab cum harum eius.</p> */}
              </div>
            </div>
            <div className="demo2 demo11 " ref={ref2}>
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelejemplo2.png?alt=media&token=ef8507c8-3fac-4788-be6b-9a76fba0b7f2" 
                alt="collage-3" 
              />
              <div className="data data2">
                <p>POR QUE ELEGIRNOS</p>
                <p>{info.chooseUs}</p>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptate commodi eos excepturi! Odio, facilis quae consequuntur, inventore quos perspiciatis quia eius ea sequi veritatis, nemo quibusdam quam? Omnis maxime hic fugit, dolore ab quisquam ipsam saepe voluptate? Tempora, aut!</p> */}
              </div>
            </div>
            <div className="demo1 demo11" ref={ref3}>
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelejemplo3.png?alt=media&token=ede3bbbc-57f5-40a0-b1c7-89f1b20c2d23" 
                alt="collage-4" 
              />
              <div className="data">
                <p>EXTRAS</p>
                <p>{info.extra}</p>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia doloribus, at ipsa quaerat, saepe culpa perferendis quibusdam et magni aliquam eos dolor tenetur ducimus vitae? Voluptatem, tempore. Nam, eius non!</p> */}
              </div>
            </div>
          </div>
          <Servicios></Servicios>
         
      
      <img src={wave} alt="wave"/>
        <div className="collage">
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo4.png?alt=media&token=264fd2d1-82ac-4e24-8675-7aeb9e791f0c" 
                alt="collage-5" 
              />
            <p>Conoce gente y divertite...</p>
            </div>
          
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo5.png?alt=media&token=2545fd82-f81b-4601-9b72-fbf02f12afdf" 
                alt="collage-6" 
                />
            <p>Habitaciones economicas...</p>
            </div>
          

            <div className="img">
              <img
                src="https://cf.bstatic.com/xdata/images/xphoto/max1440/48357258.jpg?k=035ac71dc8cf908f6b770ec79bf034f5891a734d172c80159a0ac713ff2a1a7c&o="
                alt="collage-7"
                />
            <p>Camas comodas...</p>
            </div>
          

          <div className="img">
            <img
              src="https://i0.wp.com/www.disfrutarosario.com/wp-content/uploads/2020/10/Como-construir-una-pileta-en-casa-2.jpg?resize=640%2C480&ssl=1"
              alt="collage-8"
              />
            <p>Pileta climatizada</p>
            </div>
          
            <div className="img">
              <img
                src="https://hqbeds.com/wp-content/uploads/2019/11/hostel1-e1573156979842.jpg"
                alt="collage-9"
                />
            <p>Ambientes de reunion</p>
            </div>
          
            <div className="img">
              <img
                src="https://www.elcalafate.tur.ar/img/anunciantes/724/matices-hostel-2-.jpg"
                alt="collage-10"
                />
            <p>Vista del frente</p>
            </div>
          
            <div className="img">
              <img
                src="https://viajeros-17f81.kxcdn.com/wp-content/uploads/2020/10/DSC_0310-scaled.jpg"
                alt="collage-11"
                />
            <p>Nuestra otra pileta...</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelejemplo6.png?alt=media&token=a06a610e-a24c-4947-9274-e89fd5b15cf8" 
                alt="collage-12" 
                />
            <p>Cama matrimonial</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo7.png?alt=media&token=1eb9d25f-e227-4372-974a-03936755e6a9" 
                alt="collage-13" 
                />
            <p>Dormitorios compartidos</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo8.png?alt=media&token=1a436ffc-6f10-41bb-a0a7-e22ab40daf87" 
                alt="collage-14" 
                />
            <p>Wifi en las habitaciones</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo9.png?alt=media&token=fb2fa7ac-2d64-42b5-a359-62a7eaa72fbc" 
                alt="collage-15" 
                />
            <p>Habitaciones privadas</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo10.png?alt=media&token=1b94150c-a13c-4d30-9634-227d2f803200" 
                alt="collage-16" 
                />
            <p>Habitacion compartida</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo11.png?alt=media&token=40bb1bee-0d7b-4b07-b1a7-7defc17cea3c" 
                alt="collage-17" 
                />
            <p>Habitacion compartida con lockers</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo12.png?alt=media&token=1ad420e7-761a-4939-aa74-1a1f551558aa" 
                alt="collage-18" 
                />
            <p>Zona de estudio</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo13.png?alt=media&token=3d77598d-538d-42d0-8003-a718d57cdaa7" 
                alt="collage-19" 
                />
            <p>Habitacion compartida</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo14.png?alt=media&token=635e0ca3-8bcd-44cc-a4ee-20e2c1dc8a64" 
                alt="collage-20" 
                />
            <p>Habitacion compartida</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo15.png?alt=media&token=5832c9a7-76e2-42f0-851d-252f45a2f665" 
                alt="collage-21" 
                />
            <p>Habitacion compartida</p>
            </div>
          
            <div className="img">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/imgs-b915c.appspot.com/o/hostelEjemplo16.png?alt=media&token=0fc62769-41f6-4e40-a6dd-351cabe18b14" 
                alt="collage-22" 
                />
            <p>Habitacion compartida</p>
            </div>
          
          </div>
        </div>

        <div className="review">
          <Review />
          <div className="miraReviews">
            <p className="mira">Mira lo que los demas usuarios opinan de nosotros</p>
            <Link to='/reviewHostel'>Dejanos tu review</Link>
          </div>
      </div>

     

      <Footer></Footer>
    </div>
  );
};

export default Home;