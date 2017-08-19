// @flow

import { get } from '../api';
import type { Store } from './index';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

// Type the state created by reducer in this file
export type State = {
  +loading: boolean,
  +current: string,
  +list: Array<Coin>,
};

// Type coin object
type Coin = {
  symbol: string,
  name: string,
  price?: number,
  price24hAgo?: number,
  priceChange?: number,
};

// Type all actions along with the data that gets passed
type Action =
  | { type: 'LOADING_PRICES' }
  | { type: 'SELECTED_COIN', symbol: string }
  | { type: 'ADDED_COIN', symbol: string, name: string }
  | { type: 'UPDATED_24H_AGO_PRICE', symbol: string, price: number }
  | { type: 'UPDATED_PRICES',
      response: {
        [symbol: string]: {
          ['USD' | 'EUR' | 'BTC']: number
        }
      }
    };

// Type Redux actions and functions
type GetState = () => Store;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

// -----------------------------------------------------------------------------
// Initial state
// -----------------------------------------------------------------------------

const initialState: State = {
  // loading flag to show activity indicator when prices are being updated
  loading: true,
  // Preselect BTC coin
  current: 'BTC',
  // Predefine a list of coins
  list: [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'LTC', name: 'Litecoin' },
    { symbol: 'ETC', name: 'Ethereum Classic' },
    { symbol: 'DASH',name: 'DigitalCash' },
    { symbol: 'XEM', name: 'NEM' },
    { symbol: 'XMR', name: 'Monero' },
  ],
};

// -----------------------------------------------------------------------------
// Actions
// -----------------------------------------------------------------------------

// Add a coin
export const addCoin = (symbol: string, name: string): ThunkAction => async dispatch => {
  dispatch({
    type: 'ADDED_COIN',
    symbol,
    name,
  });
  dispatch(updatePrices());
};

// Select a coin
export const selectCoin = (symbol: string): Action => ({
  type: 'SELECTED_COIN',
  symbol,
});

// Update prices for all coins
export const updatePrices = (): ThunkAction => async (dispatch, getState) => {
  dispatch({ type: 'LOADING_PRICES' });
  const {
    coins: {
      list
    }
  } = getState();
  const symbols = coinsToCommaSeparatedSymbolList(list);
  const response = await get(`data/pricemulti?fsyms=${symbols}&tsyms=USD`);
  dispatch({
    type: 'UPDATED_PRICES',
    response,
  });
  // Update 24 hour ago prices for each coin
  list.forEach(coin =>
    dispatch(fetch24hAgoPrice(coin.symbol))
  );
};

// Fetch 24 hour ago price for a coin
export const fetch24hAgoPrice = (symbol: string): ThunkAction => async dispatch => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const timestampYesterday = timestamp - (24 * 3600);
  const response = await get(`data/histohour?fsym=${symbol}&tsym=USD&limit=1&toTs=${timestampYesterday}`);
  if (response.Data.length > 0) {
    // Get last entry's close price in Data array since the API returns two entries
    const price = response.Data.slice(-1).pop().close;
    dispatch({
      type: 'UPDATED_24H_AGO_PRICE',
      symbol,
      price,
    });
  }
};

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    // Update loading state
    case 'LOADING_PRICES': {
      return {
        ...state,
        loading: true,
      };
    }

    // Update all coin prices
    case 'UPDATED_PRICES': {
      const { list } = state;
      const { response } = action;
      return {
        ...state,
        // map through each coin
        list: list.map(coin => ({
          ...coin,
          // to update the prices
          price: response[coin.symbol] ? response[coin.symbol].USD : undefined,
        })),
        loading: false,
      };
    }

    // Update 24 hour ago price for a specific coin
    case 'UPDATED_24H_AGO_PRICE': {
      const { list } = state;
      const { symbol, price } = action;
      return {
        ...state,
        // map through each coin
        list: list.map(coin => ({
          ...coin,
          // to find the one that matches
          ...(coin.symbol === symbol ? {
            // and update it's 24 hour ago price
            price24hAgo: price,
            // and the change compared to current price
            priceChange: coin.price ? getPriceChange(coin.price, price) : undefined,
          } : {
            // don't change any values if didn't match
          })
        })),
      };
    }

    // Add new coin
    case 'ADDED_COIN': {
      const { symbol, name } = action;

      // Coin is already in the list
      if (state.list.find(coin => coin.symbol === symbol)) {
        return state;
      }

      return {
        ...state,
        list: [
          ...state.list,
          { symbol, name },
        ],
      };
    }

    // Change current coin
    case 'SELECTED_COIN': {
      const { symbol } = action;
      return {
        ...state,
        current: symbol,
      };
    }

    default: {
      return state;
    }
  }
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

// Convert coin array to a comma separated symbol list for the API calls
const coinsToCommaSeparatedSymbolList = (list: Array<Coin>): string => list
  .map(item => item.symbol)
  .reduce((prev, current) => prev + ',' + current);

// Get percentage change between current and previous prices
const getPriceChange = (currentPrice: number, previousPrice: number): number => {
  if (!previousPrice) {
    return 0;
  }
  return parseFloat((((currentPrice / previousPrice) - 1) * 100).toFixed(2));
};