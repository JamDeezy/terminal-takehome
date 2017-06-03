import React from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";

class BookingsIndex extends React.Component {
  render() {
    return (
      <div className="bookings-index">
        Bookings Index
      </div>
    );
  }
}

export default withRouter(BookingsIndex);
