import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectRange } from '../redux/chart';
import Switcher from '../components/range/switcher';
import { RANGES } from '../redux/chart';

@connect(
  (state) => {
    const {
      chart: {
        range,
      },
    } = state;
    return {
      range,
    };
  },
  (dispatch) => bindActionCreators({ selectRange }, dispatch)
)
export default class Ranges extends Component {

  render() {
    const {
      range,
      selectRange,
    } = this.props;
    return (
      <View style={styles.container}>
        <Switcher
          ranges={RANGES}
          current={range}
          onSelectRange={selectRange}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#673AB7',
  },
});