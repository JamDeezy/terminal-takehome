import React from "react";
import { withRouter, Route } from "react-router-dom";
import * as apis from "../../apis";

import "./style.scss";

class Search extends React.Component {
  componentWillMount() {
    this.setState({
      refNum: "",
      result: {}
    });
  }

  handleSubmit() {
    apis.bookingsShow(this.state.refNum).then(response => {
      if (response.status === "error") {
        this.props.history.push(`/errors`, response);
      } else {
        this.props.history.push(`/bookings/${this.state.refNum}`, response);
      }
    });
  }

  handleInputChange(e) {
    this.setState({ refNum: e.target.value });
  }

  renderPrompt() {
    if (!this.state.result["ref_num"]) {
      return (
        <div className="results">
          Please search for a B/L Reference Number
        </div>
      );
    }
  }

  render() {
    return (
      <div className="search">
        Search <br />
        <input
          className="search"
          placeholder="Shipping number"
          onChange={this.handleInputChange.bind(this)}
        />
        <button className="submit" onClick={this.handleSubmit.bind(this)}>
          Submit
        </button>

        {this.renderPrompt()}
        <hr />
      </div>
    );
  }
}
export default withRouter(Search);
