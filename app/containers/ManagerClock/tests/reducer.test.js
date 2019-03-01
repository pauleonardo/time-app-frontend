import { fromJS, List } from 'immutable';
import managerClockReducer from '../reducer';
import {
  ERROR_UPDATE_TIME,
  RETRY_WEBSOCKET_INIT,
  UPDATE_TIME,
  UPDATED_TIME,
  WEBSOCKET_CONECTED,
  WEBSOCKET_CONNECTION_FAILED,
  WEBSOCKET_INIT,
} from '../constants';
describe('managerClockReducer', () => {
  it('returns the initial state', () => {
    expect(managerClockReducer(undefined, {})).toEqual(
      fromJS({
        WEBSOCKET_STATUS: false,
        WEBSOCKET_CONNECTING: false,
        WEBSOCKET_ERROR: '',
        UPDATING_TIME: false,
        UPDATING_ERROR: '',
        TIME: [],
      }),
    );
  });

  it('Estado cuando esta inicializando el websocket', () => {
    const action = {
      type: WEBSOCKET_INIT,
    };
    expect(managerClockReducer(undefined, action)).toEqual(
      fromJS({
        WEBSOCKET_STATUS: false,
        WEBSOCKET_CONNECTING: true,
        WEBSOCKET_ERROR: '',
        UPDATING_TIME: false,
        UPDATING_ERROR: '',
        TIME: [],
      }),
    );
  });

  it('Estado cuando el websocket esta conectado', () => {
    const action = {
      type: WEBSOCKET_CONECTED,
    };
    const statePrevio = fromJS({
      WEBSOCKET_STATUS: false,
      WEBSOCKET_CONNECTING: true,
      WEBSOCKET_ERROR: '',
      UPDATING_TIME: false,
      UPDATING_ERROR: '',
      TIME: [],
    });
    expect(managerClockReducer(statePrevio, action)).toEqual(
      fromJS({
        WEBSOCKET_STATUS: true,
        WEBSOCKET_CONNECTING: false,
        WEBSOCKET_ERROR: '',
        UPDATING_TIME: false,
        UPDATING_ERROR: '',
        TIME: [],
      }),
    );
  });

  it('Estado cuando la conexión del socket falló', () => {
    const action = {
      type: WEBSOCKET_CONNECTION_FAILED,
      error: 'WEBSOCKET DISCONNECTED',
    };
    const statePrevio = fromJS({
      WEBSOCKET_STATUS: true,
      WEBSOCKET_CONNECTING: false,
      WEBSOCKET_ERROR: '',
      UPDATING_TIME: false,
      UPDATING_ERROR: '',
      TIME: [],
    });
    expect(managerClockReducer(statePrevio, action)).toEqual(
      fromJS({
        WEBSOCKET_STATUS: false,
        WEBSOCKET_CONNECTING: false,
        WEBSOCKET_ERROR: 'WEBSOCKET DISCONNECTED',
        UPDATING_TIME: false,
        UPDATING_ERROR: '',
        TIME: [],
      }),
    );
  });

  it('Estado cuando se reintenta la reconexión con websocket', () => {
    const action = {
      type: RETRY_WEBSOCKET_INIT,
    };
    const statePrevio = fromJS({
      WEBSOCKET_STATUS: false,
      WEBSOCKET_CONNECTING: false,
      WEBSOCKET_ERROR: 'WEBSOCKET DISCONNECTED',
      UPDATING_TIME: false,
      UPDATING_ERROR: '',
      TIME: [],
    });
    expect(managerClockReducer(statePrevio, action)).toEqual(
      fromJS({
        WEBSOCKET_STATUS: false,
        WEBSOCKET_CONNECTING: true,
        WEBSOCKET_ERROR: '',
        UPDATING_TIME: false,
        UPDATING_ERROR: '',
        TIME: [],
      }),
    );
  });

  it('Estado cuando se esta actualizando la hora', () => {
    const action = {
      type: UPDATE_TIME,
    };
    const statePrevio = fromJS({
      WEBSOCKET_STATUS: true,
      WEBSOCKET_CONNECTING: false,
      WEBSOCKET_ERROR: '',
      UPDATING_TIME: false,
      UPDATING_ERROR: '',
      TIME: [],
    });
    expect(managerClockReducer(statePrevio, action)).toEqual(
      fromJS({
        WEBSOCKET_STATUS: true,
        WEBSOCKET_CONNECTING: false,
        WEBSOCKET_ERROR: '',
        UPDATING_TIME: true,
        UPDATING_ERROR: '',
        TIME: [],
      }),
    );
  });

  it('Estado cuando falló la actualización de hora', () => {
    const action = {
      type: ERROR_UPDATE_TIME,
      error: 'SERVER ERROR',
    };
    const statePrevio = fromJS({
      WEBSOCKET_STATUS: true,
      WEBSOCKET_CONNECTING: false,
      WEBSOCKET_ERROR: '',
      UPDATING_TIME: true,
      UPDATING_ERROR: '',
      TIME: [],
    });
    expect(managerClockReducer(statePrevio, action)).toEqual(
      fromJS({
        WEBSOCKET_STATUS: true,
        WEBSOCKET_CONNECTING: false,
        WEBSOCKET_ERROR: '',
        UPDATING_TIME: false,
        UPDATING_ERROR: 'SERVER ERROR',
        TIME: [],
      }),
    );
  });

  it('Estado cuando finaliza con éxito la actualización de hora', () => {
    const action = {
      type: UPDATED_TIME,
      payload: [
        {
          city: 'America/Santiago',
          time: 1550964790,
          latitude: -33.435974,
          longitude: -70.67286,
        },
        {
          city: 'Europe/Zurich',
          time: 1550965072,
          latitude: 47.37861,
          longitude: 8.54,
        },
        {
          city: 'Pacific/Auckland',
          time: 1550964790,
          latitude: -36.85,
          longitude: 174.78333,
        },
      ],
    };
    const statePrevio = fromJS({
      WEBSOCKET_STATUS: true,
      WEBSOCKET_CONNECTING: false,
      WEBSOCKET_ERROR: '',
      UPDATING_TIME: true,
      UPDATING_ERROR: '',
      TIME: [],
    });
    expect(managerClockReducer(statePrevio, action)).toEqual(
      fromJS({
        WEBSOCKET_STATUS: true,
        WEBSOCKET_CONNECTING: false,
        WEBSOCKET_ERROR: '',
        UPDATING_TIME: false,
        UPDATING_ERROR: '',
        TIME: List([
          {
            city: 'America/Santiago',
            time: 1550964790,
            latitude: -33.435974,
            longitude: -70.67286,
          },
          {
            city: 'Europe/Zurich',
            time: 1550965072,
            latitude: 47.37861,
            longitude: 8.54,
          },
          {
            city: 'Pacific/Auckland',
            time: 1550964790,
            latitude: -36.85,
            longitude: 174.78333,
          },
        ]),
      }),
    );
  });
});
