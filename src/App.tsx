import React from 'react';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import withAuth from './components/HOC/withAuth';

const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id
});

cache.writeData({
  data: {
    books: [],
    isAuthenticated: !!localStorage.getItem('isAuthenticated') || false
  }
})

const client = new ApolloClient({
  cache,
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  resolvers: {
    Query: {
      isAuthenticated: (auth, args, { cache }) => {
        return !!localStorage.getItem('isAuthenticated')
      }
    }
  }
});

const App: React.FC = () => {

  const DashboardWithAuth = withAuth(Dashboard);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <div className="row">
            <Header />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="">
                <DashboardWithAuth />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
