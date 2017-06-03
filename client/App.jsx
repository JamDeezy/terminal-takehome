import * as React from "react";
import * as ReactRouter from "react-router-dom";
import "./App.scss";

import Search from "./modules/Search";
import { BookingsIndex, BookingsShow } from "./modules/Bookings";

const { BrowserRouter, Route, Redirect, Switch } = ReactRouter;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/search" component={Search} />
            <Route exact path="/bookings" component={BookingsIndex} />
            <Route
              exact
              path="/bookings/:booking_id"
              component={BookingsShow}
            />
            <Redirect from="/" to="/search" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
