import React from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";

class Errors extends React.Component {
  render() {
    return (
      <div className="errors">
        {this.props.location.state.message}
      </div>
    );
  }
}

export default withRouter(Errors);
