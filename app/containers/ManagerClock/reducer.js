/*
 *
 * ManagerClock reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  WEBSOCKET_CONECTED,
  WEBSOCKET_INIT,
  WEBSOCKET_CONNECTION_FAILED,
  RETRY_WEBSOCKET_INIT,
  UPDATE_TIME,
  RETRY_UPDATE_TIME,
  UPDATED_TIME,
  ERROR_UPDATE_TIME,
} from './constants';

export const initialState = fromJS({
  WEBSOCKET_STATUS: false,
  WEBSOCKET_CONNECTING: false,
  WEBSOCKET_ERROR: '',
  UPDATING_TIME: false,
  UPDATING_ERROR: '',
  TIME: [],
});

function managerClockReducer(state = initialState, action) {
  switch (action.type) {
    case WEBSOCKET_INIT:
      return state.set('WEBSOCKET_CONNECTING', true);
    case WEBSOCKET_CONECTED:
      return state
        .set('WEBSOCKET_STATUS', true)
        .set('WEBSOCKET_CONNECTING', false)
        .set('WEBSOCKET_ERROR', '');
    case WEBSOCKET_CONNECTION_FAILED:
      return state
        .set('WEBSOCKET_STATUS', false)
        .set('WEBSOCKET_ERROR', action.error);
    case RETRY_WEBSOCKET_INIT:
      return state.set('WEBSOCKET_CONNECTING', true).set('WEBSOCKET_ERROR', '');
    case UPDATE_TIME:
      return state.set('UPDATING_TIME', true).set('UPDATING_ERROR', '');
    case UPDATED_TIME:
      return state
        .set('UPDATING_TIME', false)
        .set('TIME', List(action.payload));
    case RETRY_UPDATE_TIME:
      return state.set('UPDATING_TIME', true).set('UPDATING_ERROR', '');
    case ERROR_UPDATE_TIME:
      return state
        .set('UPDATING_TIME', false)
        .set('UPDATING_ERROR', action.error);
    default:
      return state;
  }
}

export default managerClockReducer;
