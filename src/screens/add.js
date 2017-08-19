// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Add from '../containers/add';
import type { Navigation } from '../app';

export default class extends Component {

  props: {
    navigation: Navigation,
  };

  onClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onClose}>
          <Icon
            name="md-close"
            size={30}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Add onAddedCoin={this.onClose} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // put content below status bar
    // backgroundColor: 'white',
    backgroundColor: '#673AB7',
  },
  button: {
    margin: 10,
  },
});