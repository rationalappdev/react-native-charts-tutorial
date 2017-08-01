// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const getBadgeStyles = (value: number): Array<any> => [
  styles.badge,
  value < 0 ? styles.bad : (value > 0 ? styles.good : styles.same)
];

export default class Change extends PureComponent {

  props: {
    value: ?number,
  };

  render() {
    const { value: input } = this.props;
    const value: number = input || 0; // convert to number
    const icon = value === 0 || !value
      ? <Text>{' '}</Text>
      : <Icon name={value < 0 ? 'caret-down' : 'caret-up'} style={styles.icon} />;
    return (
      <View style={getBadgeStyles(value)}>
        {icon}
        <Text style={styles.value} numberOfLines={1}>
          {Math.abs(value)}%
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    minHeight: 16,
  },
  good: { backgroundColor: '#4CAF50' },
  bad: { backgroundColor: '#FF5505' },
  same: { backgroundColor: '#F5A623' },
  value: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 11,
    marginTop: 0,
  },
  icon: {
    fontSize: 18,
    lineHeight: 16,
    marginRight: 2,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
