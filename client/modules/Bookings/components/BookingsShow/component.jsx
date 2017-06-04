import React from "react";
import { withRouter } from "react-router-dom";
import * as apis from "../../../../apis";

import "./style.scss";

class BookingsShow extends React.Component {
  componentWillMount() {
    if (!this.props.location.state) {
      this.setState({
        booking: {
          containers: [],
          destination: "",
          origin: "",
          reference_id: "",
          steamship_line: "",
          vessel: "",
          vessel_eta: "",
          voyage: "",
          watch: false
        }
      });

      // Code Smell:
      // This delegates our API request asynchronously
      // which would cause race conditions.
      // In production, implement redux store and use sagas to
      // handle async actions
      apis.bookingsShow(this.props.match.params.booking_id).then(response => {
        if (response.status === "error") {
          this.props.history.push(`/errors`, response);
        } else {
          this.setState({ booking: response });
        }
      });
    } else {
      this.setState({ booking: this.props.location.state });
    }
  }

  handleWatch() {
    let api = this.state.booking.watch
      ? apis.bookingsUnwatch
      : apis.bookingsWatch;

    api(this.state.booking.reference_id).then(response => {
      if (response.status === "error") {
        this.props.history.push(`/errors`, response);
      } else {
        this.setState({ booking: response });
      }
    });
  }

  renderContainers() {
    return this.state.booking.containers.map(container => {
      return (
        <li className="containers" key={`${container.name}-${container.size}`}>
          Number: {container.number} ---
          Size: {container.size} ---
          Type: {container.type}
        </li>
      );
    });
  }

  renderWatch() {
    return (
      <button
        className={this.state.booking.watch ? "unwatch" : "watch"}
        onClick={this.handleWatch.bind(this)}
      >
        {this.state.booking.watch ? "Unwatch" : "Watch"}
      </button>
    );
  }

  render() {
    return (
      <div className="bookings-show">
        <div className="row">
          <div className="left">Booking (ref num)</div>
          <div className="right">{this.state.booking.reference_id}</div>
        </div>
        <div className="row">
          <div className="left">Steamship Line</div>
          <div className="right">{this.state.booking.steamship_line}</div>
        </div>
        <div className="row">
          <div className="left">Origin</div>
          <div className="right">{this.state.booking.origin}</div>
        </div>
        <div className="row">
          <div className="left">Destination</div>
          <div className="right">{this.state.booking.destination}</div>
        </div>
        <div className="row">
          <div className="left">Vessel</div>
          <div className="right">{this.state.booking.vessel}</div>
        </div>
        <div className="row">
          <div className="left">Voyage</div>
          <div className="right">{this.state.booking.voyage}</div>
        </div>
        <div className="row">
          <div className="left">ETA</div>
          <div className="right">{this.state.booking.vessel_eta}</div>
        </div>
        <div className="row">
          <div className="left">Containers</div>
          <div className="right">{this.renderContainers()}</div>
        </div>
        <div className="row">
          <div className="left">Watch</div>
          <div className="right">{this.renderWatch()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(BookingsShow);
