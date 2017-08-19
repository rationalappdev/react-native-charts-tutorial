// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class Row extends Component {

  props: {
    symbol: string,
    name: string,
    onPress: Function,
  };

  onPress = () => {
    const {
      symbol,
      name,
      onPress,
    } = this.props;
    onPress(symbol, name);
  };

  render() {
    const {
      symbol,
      name,
    } = this.props;
    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor="#7E57C2"
        style={styles.container}
      >
        <View>
          <Text style={styles.text} numberOfLines={1}>
            {symbol}
          </Text>
          <Text style={[styles.text, styles.name]} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'rgba(255,255,255,0.25)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '300',
  },
});