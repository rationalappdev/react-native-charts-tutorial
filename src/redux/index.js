// @flow

import { combineReducers } from 'redux';
// import reducers
import chart from './chart';
import coins from './coins';
// import types
import type { State as Chart } from './chart';
import type { State as Coins } from './coins';

export type Store = {
  +chart: Chart,
  +coins: Coins,
};

export default combineReducers({
  chart,
  coins,
});