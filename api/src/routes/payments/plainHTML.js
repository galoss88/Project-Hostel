const aprobado = ({
  name,
  lastname,
  status,
  dni,
  camas,
  payment_id,
  check_in,
  check_out,
}) => {
  return `
  <div style="width:100%;background-color: blanchedalmond;padding-top:10px;margin:auto; font-family: sans-serif;"><div class="adM">
</div><div style="width:max-content;margin-top:20px;margin:auto;background:#fff"><div class="adM">
    </div>
    <div style="padding:20px 30px;height:max-content; background-color: rgb(33,37,41);">
        <div style="text-align: center; padding: 30px;">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.vexels.com%2Fmedia%2Fusers%2F3%2F157890%2Fisolated%2Fpreview%2F4f2c005416b7f48b3d6d09c5c6763d87-check-mark-circle-icon-by-vexels.png&f=1&nofb=1&ipt=fc82e7ac08bfe018b8c9b2cd1e2ad4fb9c473ecacb8ef17ef663f73bb49e0929&ipo=images" style="width: 50px; height: 50px;" alt="CheckPayment">
        </div>
        <p style="color:#fff;">Hola ¡<b style="color:#fff;">${name}</b>! 👋👋</p>
        <p style="color:#fff;">Gracias por confiar en Hostel Dinamita</p>
        <label style="color:#fff;">Estado de pago: </label><b style="color:#fff;">${status}</b>
        <p style="color:#fff;">- - - - - - - Detalle de la compra - - - - - - -</p>
        <div style="color:#000;background-color: #e3e3e3; padding: 15px; font-size: 13px;">
            <p>ID de la compra: ${payment_id}</p>
            <p>Nombre: ${name} ${lastname}</p>
            <p>DNI: ${dni}</p>
            <p>Camas: ${camas} camas</p>
            <p>Desde: ${check_in}</p>
            <p>Hasta: ${check_out}</p>
        </div>
        <p style="color:#fff;">- - - - - - - - - - - - - - - - - - - - - - - - -</p>
    </div>
</div>
<p style="width:300px;text-align:center;margin:auto;padding:15px; color: rgb(49, 49, 49);">Para mas informacion <a href="http://localhost:3000" target="_blank" style="text-decoration: none; color:#000; font-weight: 700;">Contactenos</a></p><div class="yj6qo"></div><div class="adL">
</div></div>`;
};

const rechazado = ({ name, status }) => {
    let estado = "";
    if(status !== "approved") estado = "failed"
  return `
    <div style="width:100%;background-color: blanchedalmond;padding-top:10px;margin:auto; font-family: sans-serif;"><div class="adM">
</div><div style="width:max-content;margin-top:20px;margin:auto;background:#fff"><div class="adM">
    </div>
    <div style="padding:20px 30px;height:max-content; background-color: rgb(33,37,41);">
        <div style="text-align: center; padding: 30px;">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fbasic-ui-elements-color-round%2F3%2F44-512.png&f=1&nofb=1&ipt=c8ece20f4e2ba8713f883857a8c15e2d05ef1de96e92eeb21e2f7e627e5812fd&ipo=images" style="width: 50px; height: 50px;" alt="CheckPayment">
        </div>
        <p style="color:#fff;">Hola ¡<b style="color:#fff;">${name}</b>! 👋👋</p>
        <p style="color:#fff;">Tuvimos problemas con el pago :(</p>
        <label style="color:#fff;">Estado de pago: </label><b style="color:#fff;">${estado}</b>
        <p style="color:#fff;">- - - - - - - - - - - - - - - - - - - - - - - - -</p>
        <div style="color:#000;background-color: #e3e3e3; padding: 15px; font-size: 13px;">
            <p>No se pudo realizar la compra, pruebe <br> con otro medio de pago o <a href="http://localhost:3000" target="_blank" style="text-decoration: none; color:#000; font-weight: 700;">Contactenos</a></p>
        </div>
        <p style="color:#fff;">- - - - - - - - - - - - - - - - - - - - - - - - -</p>
    </div>
</div>
<p style="width:300px;text-align:center;margin:auto;padding:15px; color: rgb(49, 49, 49);">Para mas informacion <a href="http://localhost:3000" target="_blank" style="text-decoration: none; color:#000; font-weight: 700;">Contactenos</a></p><div class="yj6qo"></div><div class="adL">
</div></div>`;
};
module.exports = { aprobado, rechazado };
