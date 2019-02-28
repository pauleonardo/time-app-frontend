/*
 *
 * ManagerClock actions
 *
 */

import {
  WEBSOCKET_INIT,
  WEBSOCKET_CONECTED,
  RETRY_WEBSOCKET_INIT,
  WEBSOCKET_CONNECTION_FAILED,
  UPDATE_TIME,
  UPDATED_TIME,
  RETRY_UPDATE_TIME,
  ERROR_UPDATE_TIME,
} from './constants';

export function websocketInitAction() {
  return {
    type: WEBSOCKET_INIT,
  };
}

export function websocketConnectedAction() {
  return {
    type: WEBSOCKET_CONECTED,
  };
}

export function retryWebsocketInitAction() {
  return {
    type: RETRY_WEBSOCKET_INIT,
  };
}

export function websocketDisconnetedAction(error) {
  return {
    type: WEBSOCKET_CONNECTION_FAILED,
    error,
  };
}

export function updateTimeAction() {
  return {
    type: UPDATE_TIME,
  };
}

export function updatedTimeAction(time) {
  return {
    type: UPDATED_TIME,
    payload: time,
  };
}

export function retryUpdateTime() {
  return {
    type: RETRY_UPDATE_TIME,
  };
}

export function errorUpdateTime(error) {
  return {
    type: ERROR_UPDATE_TIME,
    error,
  };
}
