/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import cookie from 'react-cookies';

import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
// import FeaturePage from 'containers/FeaturePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import UserPage from 'containers/UserPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import FlatButton from 'material-ui/FlatButton';


import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

// import Header from 'components/Header';
// import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Skill Endorser"
            iconElementRight={
              <FlatButton
                label="SIGN OUT"
                onClick={() => {
                  cookie.remove('_se_user_id', { path: '/' });
                  cookie.remove('_se_user_mongo_id', { path: '/' });
                  window.location.replace('/');
                }}
              />
            }
          />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/user/:user_id" component={UserPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </AppWrapper>
  );
}
