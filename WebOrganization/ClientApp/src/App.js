import React, { Component, Fragment } from 'react';
import Employee from './components/Employee';
import { Company } from './components/Company';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';

class App extends Component {

  render() {
      return <Layout>
          <Switch>
              <Route path='/company' component={Company} />
              <Route path='/' component={Employee} />
          </Switch>
      </Layout>;
  }
}

export default App;
