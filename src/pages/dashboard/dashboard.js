import React, { Component } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";

class Dashboardindex extends Component {
  render() {
    return (
      <div>
        <div className="container mt-3">
          <p className="">My Properties (0)</p>

          <div className="mt-5 text-center">
            <ApartmentIcon
              className="text-muted no-apartment-icon"
              style={{ fontSize: 12 + "rem" }}
            />

            <p className="text-muted">No Properties added yet</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboardindex;
