import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import StackNavigator from './navigation';
import client from './client';

export default class App extends Component {
  render() {
    StatusBar.setBarStyle('light-content');
    return (
      <ApolloProvider client={client}>
        <StackNavigator />
      </ApolloProvider>
    );
  }
}
