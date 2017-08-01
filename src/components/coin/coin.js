// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import numeral from 'numeral';
import Change from './change';

// Get screen width
const { width } = Dimensions.get('window');

export default class Coin extends Component {

  props: {
    symbol: string,
    name: string,
    price: number,
    change: number,
    active: boolean,
    onPress: Function,
  };

  static defaultProps = {
    active: false,
  };

  onPress = () => {
    const { symbol, onPress } = this.props;
    onPress(symbol);
  };

  render() {
    const {
      symbol,
      name,
      price,
      change,
      active,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, active ? styles.active : {}]}
        onPress={this.onPress}
      >
        <View style={styles.row}>
          <Text style={styles.text} numberOfLines={1}>
            {symbol}
          </Text>
          <View style={styles.right}>
            <Text style={styles.text} numberOfLines={1}>
              {price ? numeral(price).format('$0,0[.]0[0000]') : '—'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={[styles.text, styles.name]} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.right}>
            {change !== undefined && <Change value={change} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    width: (width - 20) / 2, // take half of the screen width minus margin
  },
  active: {
    backgroundColor: 'rgba(255,255,255,0.05)',  // highlight selected coin
  },
  row: {
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
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
