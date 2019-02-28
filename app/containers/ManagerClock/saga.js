import { take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import { updatedTimeAction } from './actions';

function createSocketChannel(socket) {
  return eventChannel(emitter => {
    socket.on('time', timeSet => {
      if (timeSet !== null) {
        emitter(updatedTimeAction(timeSet));
      }
    });
    return () => {
      socket.disconnect();
    };
  });
}

const socketServerURL = process.env.SERVERSOCKET || 'http://localhost:3001';

function connectToServer() {
  const socket = io(socketServerURL, {
    transports: ['websocket'],
  });
  return new Promise(resolve => {
    socket.on('connect', () => {
      setInterval(() => {
        socket.emit('requestTime');
      }, 10000);
      resolve(socket);
    });
  });
}

export default function* websocketEventSaga() {
  const socket = yield call(connectToServer);
  const socketChannel = yield createSocketChannel(socket);
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

// export default function* managerClockSaga() {
//   // yield take(websocketEventSaga());
// }
