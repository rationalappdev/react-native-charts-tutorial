// @flow

import React, { Component } from 'react';
import {
  ListView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCoin } from '../redux/coins';
import Row from '../components/coin/row';

// Type API response shape
type Response = {
  Data: {
    [symbol: string]: {
      CoinName: string,
      Name: string,
    },
  },
};

// Type coin object
type Coin = {
  symbol: string,
  name: string,
};

@connect(
  (state) => ({}),
  (dispatch) => bindActionCreators({ addCoin }, dispatch)
)
export default class Add extends Component {

  props: {
    onAddedCoin: () => void,
  };

  state = {
    // Used to show activity indicator when the data is being loaded
    loading: true,
    // Holds the data for ListView
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  };

  // Load list data when component is about to get mounted
  componentWillMount() {
    this.loadListData();
  };

  // Load the data, transform it, and update the list
  loadListData = async () => {
    const response = await this.fetchCoinList();
    const coins = this.transformAPIResponse(response);
    this.updateDataSource(coins);
  };

  // Query API and return raw response
  fetchCoinList = async (): Promise<Response> => {
    const response = await fetch('https://www.cryptocompare.com/api/data/coinlist');
    return response.json();
  };

  // Transform API response into Array<{ symbol, name }> format
  transformAPIResponse = (response: Response): Array<Coin> => {
    const coins = response.Data;
    return Object.keys(coins).map(symbol => ({
      symbol: coins[symbol].Name,
      name: coins[symbol].CoinName,
    }));
  };

  // Update the state with coin data
  updateDataSource(coins: Array<Coin>) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(coins),
      loading: false,
    });
  }

  // Render each row using Row component
  renderRow = (coin: Coin) => {
    const { symbol, name } = coin;
    return <Row
      symbol={symbol}
      name={name}
      onPress={this.onAddCoin}
    />
  };

  // Handle row presses
  onAddCoin = (symbol: string, name: string) => {
    const { addCoin, onAddedCoin } = this.props;
    addCoin(symbol, name); // redux action
    onAddedCoin(); // closes the modal
  };

  render() {
    const { loading } = this.state;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={this.loadListData}
            tintColor="#FFFFFF"
          />
        }
      />
    );
  }

}