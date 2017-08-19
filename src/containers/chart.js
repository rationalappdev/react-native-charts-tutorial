import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateChartPrices } from '../redux/chart';
import Line from '../components/chart/line';

@connect(
  (state) => {
    const {
      coins: {
        current: symbol,
      },
      chart: {
        range,
        prices,
        loading,
      },
    } = state;
    return {
      symbol,
      range,
      prices,
      loading,
    };
  },
  (dispatch) => bindActionCreators({ updateChartPrices }, dispatch)
)
export default class Chart extends Component {

  state = {
    viewHeight: 0,
    prices: [],
  };

  componentWillMount() {
    this.props.updateChartPrices();
  }

  componentWillReceiveProps(nextProps) {
    // Update chart data if current symbol or range were changed
    if (nextProps.symbol !== this.props.symbol
      || nextProps.range !== this.props.range) {
      this.props.updateChartPrices();
    }
    this.setState({ prices: nextProps.prices });
  }

  render() {
    const {
      loading,
      prices,
    } = this.props;

    return (
      <View style={styles.container}>
        {loading && <View pointerEvents="box-none" style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>}
        {prices.length > 0 && <Line
          values={this.state.prices}
        />}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 38, // take 38% of the screen height
    backgroundColor: '#FFFFFF',
  },
  loading: {
    ...StyleSheet.absoluteFillObject, // overlay the chart
    alignItems: 'center',             // center horizontally
    justifyContent: 'center',         // center vertically
    zIndex: 1,                        // show in front of the chart
  },
});