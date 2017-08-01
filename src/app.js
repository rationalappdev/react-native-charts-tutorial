import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './redux';
import Chart from './containers/chart';
import Ranges from './containers/ranges';
import List from './containers/list';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Chart />
          <Ranges />
          <List />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,        // take up the whole screen
    paddingTop: 20, // put content below status bar
  },
});
