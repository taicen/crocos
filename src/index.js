import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.sass';

import { Provider } from 'unistore/react';
import Store from './state/Store';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Error from './pages/Error';

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/posts' component={Posts} />
          <Route path='/post/:id' component={Post} />
          <Route path='*' component={Error} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
