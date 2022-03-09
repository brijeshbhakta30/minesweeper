import { eventChannel, EventChannel } from 'redux-saga';

/**
 * Converts the raw payload to the map
 * @param payload Payload received from the game server
 * @returns Parsed details as per the application requirement
 */
export function convertMapPayload(payload: any): string[] {
  const rowList = payload.split('map:')[1].split('\n');
  return rowList.filter((item: string[]) => !!item.length);
}

/**
 * Creates socket connection channel to be used in sagas
 * @param socket WebSocket instance
 * @returns Event channel that can be used in sagas
 */
export function createSocketConnectionChannel(socket: WebSocket): EventChannel<any> {
  return eventChannel((emit) => {
    const handleOnMessage = (event: any) => {
      emit(event.data);
    };

    const errorHandler = (errorEvent: any) => {
      emit(new Error(errorEvent?.reason || 'UKNOWN'));
    };

    socket.addEventListener('message', handleOnMessage);
    socket.addEventListener('error', errorHandler);

    const unsubscribe = () => {
      socket.removeEventListener('message', handleOnMessage);
    };

    return unsubscribe;
  });
}
