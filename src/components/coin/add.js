// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Get screen width
const { width } = Dimensions.get('window');

export default class Add extends Component {

  props: {
    onPress: () => void,
  };

  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Icon name={'md-add-circle'} style={styles.icon} />
          <Text>{' '}</Text>
          <Text style={styles.text}>Add coin</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // center horizontally
    width: width,         // take the screen width
    marginTop: 15,
  },
  button: {
    flexDirection: 'row', // arrange icon and text in a row
    alignItems: 'center', // center vertically
    padding: 15,
  },
  icon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 16,
  },
});