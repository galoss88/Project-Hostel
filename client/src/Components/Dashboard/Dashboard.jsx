import React, { useEffect } from "react";
import Clientlist from "./Clientslist";
import Analytics from "./Analytics";
// import Payments from "./Payments";
// import FAQ from "./FAQ";
// import Navbar from "./Navbar";
// import Profile from "./Profile";
// import Transfers from "./Transfers";
// import scrollreveal from "scrollreveal";
export default function Dashboard() {
  return (
    <div className="container-sm mg-10">
      <div className="row">
        <div className="col">
          <br />
          <Analytics />
        </div>
       <Clientlist />
      </div>
    </div>
  );
}
