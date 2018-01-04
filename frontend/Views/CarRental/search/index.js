import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';

import ScrollToTop from '../common/ScrollToTop';
import Search from './Search';
import Result from './Result';
import Extras from './Extras';
import Form from './Form';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router basename="/rental">
      <ScrollToTop>
        <Switch>
          <Route exact path="/search" component={Search} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/extras" component={Extras} />
          <Route exact path="/form" component={Form} />
          <Redirect from="*" to="/search" />
        </Switch>
      </ScrollToTop>
    </Router>
  </Provider>,
  document.querySelector('#searchContainer')
);
