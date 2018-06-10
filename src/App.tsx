import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import StackNavigator from './navigation';
import client from './client';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StackNavigator />
      </ApolloProvider>
    );
  }
}
