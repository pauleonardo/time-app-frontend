import configureStore from 'redux-mock-store';

import {
  websocketInitAction,
  websocketConnectedAction,
  retryWebsocketInitAction,
  websocketDisconnetedAction,
  updateTimeAction,
  retryUpdateTime,
  updatedTimeAction,
  errorUpdateTime,
} from '../actions';

import {
  WEBSOCKET_INIT,
  WEBSOCKET_CONECTED,
  RETRY_WEBSOCKET_INIT,
  WEBSOCKET_CONNECTION_FAILED,
  UPDATE_TIME,
  RETRY_UPDATE_TIME,
  UPDATED_TIME,
  ERROR_UPDATE_TIME,
} from '../constants';

const mockStore = configureStore();
const store = mockStore();
// Actions to be tested

describe('ManagerClock actions', () => {
  describe('Acción que inicializa websocket', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo WEBSOCKET_INIT', () => {
      const expected = {
        type: WEBSOCKET_INIT,
      };
      expect(websocketInitAction()).toEqual(expected);
    });
    it('Lo que se obtiene en el store', () => {
      const expected = [
        {
          type: WEBSOCKET_INIT,
        },
      ];
      store.dispatch(websocketInitAction());
      expect(store.getActions()).toEqual(expected);
    });
  });
  describe('Acción que indica que el socket esta conectado', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo WEBSOCKET_CONNECTED', () => {
      const expected = {
        type: WEBSOCKET_CONECTED,
      };
      expect(websocketConnectedAction()).toEqual(expected);
    });
    it('Lo que se obtine el store', () => {
      const expected = [
        {
          type: WEBSOCKET_CONECTED,
        },
      ];
      store.dispatch(websocketConnectedAction());
      expect(store.getActions()).toEqual(expected);
    });
  });
  describe('Acción de reintento de websocket', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo RETRY_WEBSOCKET_INIT', () => {
      const expected = {
        type: RETRY_WEBSOCKET_INIT,
      };
      expect(retryWebsocketInitAction()).toEqual(expected);
    });
    it('Lo que se obtine el store', () => {
      const expected = [
        {
          type: RETRY_WEBSOCKET_INIT,
        },
      ];
      store.dispatch(retryWebsocketInitAction());
      expect(store.getActions()).toEqual(expected);
    });
  });
  describe('Acción cuando hay desconexión del socket', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo WEBSOCKET_CONNECTION_FAILED', () => {
      const expected = {
        type: WEBSOCKET_CONNECTION_FAILED,
      };
      expect(websocketDisconnetedAction()).toEqual(expected);
    });
    it('Lo que se obtiene en el store', () => {
      const expected = [
        {
          type: WEBSOCKET_CONNECTION_FAILED,
          error: 'websocket desconnected',
        },
      ];
      store.dispatch(websocketDisconnetedAction('websocket desconnected'));
      expect(store.getActions()).toEqual(expected);
    });
  });
  describe('Acción para actualizar hora', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo UPDATE_TIME', () => {
      const expected = {
        type: UPDATE_TIME,
      };
      expect(updateTimeAction()).toEqual(expected);
    });
    it('Lo que obtien el store', () => {
      const expected = [
        {
          type: UPDATE_TIME,
        },
      ];
      store.dispatch(updateTimeAction());
      expect(store.getActions()).toEqual(expected);
    });
  });
  describe('Acción para reintentar actualizar hora', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo RETRY_UPDATE_TIME', () => {
      const expected = {
        type: RETRY_UPDATE_TIME,
      };
      expect(retryUpdateTime()).toEqual(expected);
    });
    it('Lo que obtien el store', () => {
      const expected = [
        {
          type: RETRY_UPDATE_TIME,
        },
      ];
      store.dispatch(retryUpdateTime());
      expect(store.getActions()).toEqual(expected);
    });
  });
  describe('Acción que trae la hora actualizado', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo UPDATED_TIME', () => {
      const expected = {
        type: UPDATED_TIME,
      };
      expect(updatedTimeAction()).toEqual(expected);
    });
    it('Lo que obtien el store', () => {
      const expected = [
        {
          type: UPDATED_TIME,
          time: 1509993277,
        },
      ];
      store.dispatch(updatedTimeAction(1509993277));
      expect(store.getActions()).toEqual(expected);
    });
  });
  describe('Acción al obtener error actualizando hora', () => {
    beforeEach(() => {
      store.clearActions();
    });
    it('Tiene como tipo ERROR_UPDATE_TIME', () => {
      const expected = {
        type: ERROR_UPDATE_TIME,
      };
      expect(errorUpdateTime()).toEqual(expected);
    });
    it('Lo que obtien el store', () => {
      const expected = [
        {
          type: ERROR_UPDATE_TIME,
          error: 'ERRORSERVER',
        },
      ];
      store.dispatch(errorUpdateTime('ERRORSERVER'));
      expect(store.getActions()).toEqual(expected);
    });
  });
});
