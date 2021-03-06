import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import store from './utils/store';
import Auth from "./utils/auth";

import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NoMatch from '../src/pages/NoMatch';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <Nav />
          {/* always visible components go outside of Switch component */}
          <Switch>
            {/* pages that will be loaded based on url go inside of Switch component */}
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/profile'>
              {!Auth.loggedIn() ? <Redirect to='/' /> : <Profile />}
            </Route>
            
            <Route component={NoMatch} />
          </Switch>
        </Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
