import React, { PureComponent } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';

class RouteWrapper extends PureComponent {
  componentDidUpdate(prevProps) {
    RouteWrapper.onRouteChanged();
  }

  static onRouteChanged() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/login" render={() => <Login />} />
          </Switch>
    );
  }
}

export default withRouter(RouteWrapper);
