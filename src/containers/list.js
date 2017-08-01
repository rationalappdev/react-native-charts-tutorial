import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePrices, selectCoin } from '../redux/coins';
import Coin from '../components/coin/coin';

@connect(
  (state) => {
    const {
      // pull some data out of coins reducer
      coins: {
        current,  // currently selected coin
        list,     // list of all coins
        loading,  // whether prices are being updated
      }
    } = state;
    return {
      current,
      list,
      loading,
    };
  },
  (dispatch) => bindActionCreators({ updatePrices, selectCoin }, dispatch)
)
export default class List extends Component {

  componentWillMount() {
    this.props.updatePrices();
  }

  render() {
    const {
      current,
      list,
      loading,
      selectCoin,
      updatePrices,
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.list}
          // hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // enable pull-to-refresh
          refreshControl={
            <RefreshControl
              refreshing={loading}     // show activity indicator while updating prices
              onRefresh={updatePrices} // update prices when list pulled
              tintColor="#FFFFFF"
            />
          }
        >
          {list.map((coin, index) => {
            const {
              symbol,
              name,
              price,
              priceChange,
            } = coin;
            return <Coin
              symbol={symbol}
              name={name}
              price={price}
              change={priceChange}
              active={current === symbol}
              onPress={selectCoin}
              key={index}
            />;
          })}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 62,                   // take 62% of the screen height
    backgroundColor: '#673AB7',
  },
  list: {
    flexDirection: 'row',       // arrange coins in rows
    flexWrap: 'wrap',           // allow multiple rows
    paddingHorizontal: 10,
  },
});
