import React from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";

class BookingsShow extends React.Component {
  render() {
    return (
      <div className="bookings-show">
        Bookings Show {this.props.match.params.booking_id}
      </div>
    );
  }
}

export default BookingsShow;
