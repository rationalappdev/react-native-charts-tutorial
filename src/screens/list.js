// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Chart from '../containers/chart';
import Ranges from '../containers/ranges';
import List from '../containers/list';
import type { Navigation } from '../app';

export default class extends Component {

  props: {
    navigation: Navigation,
  };

  onAddCoin = () => {
    const { navigation } = this.props;
    navigation.navigate('add');
  };

  render() {
    return (
      <View style={styles.container}>
        <Chart />
        <Ranges />
        <List onAddCoin={this.onAddCoin} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,        // take up the whole screen
    paddingTop: 20, // put content below status bar
    backgroundColor: 'white',
  },
});