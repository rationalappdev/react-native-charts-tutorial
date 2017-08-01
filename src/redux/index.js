// @flow

import { combineReducers } from 'redux';
// import reducers
import coins from './coins';
// import types
import type { State as Coins } from './coins';

export type Store = {
  +coins: Coins,
};

export default combineReducers({
  coins,
});