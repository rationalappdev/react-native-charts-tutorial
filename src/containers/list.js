import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default class List extends Component {

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 62, // take 62% of the screen height
    backgroundColor: '#673AB7',
  },
});
