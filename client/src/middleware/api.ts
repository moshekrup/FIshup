import { serverTypeMsg } from './constants';

function defaultExecute(eventName: string, action: any, emit: any, on: any, next: any, dispatch: any) { // eslint-disable-line no-unused-vars
    // Wire socket.io to dispatch actions sent by the server.
    emit(eventName, action);
    
    const { returnTypes } = action;
    const [ successType, errorType, updateType ] = returnTypes;

    on(serverTypeMsg.finished, (response: any) => {
        dispatch({type: successType, payload: response})
    });

    on(serverTypeMsg.updateProgress, (response: any) => {
        dispatch({type: updateType, payload: response})
    });

    // Regular error (not fatal) is like warning, 
    // therefore the handle for err and the handle for updateProgress are same
    on(serverTypeMsg.err, (response: any) => {
        dispatch({type: updateType, payload: response})
    });

    on(serverTypeMsg.fatalErr, (response: any) => {
        dispatch({type: errorType, payload: response})
    });

    return next(action);
}

function evaluate(action: any, option: any) {
    if (!action || !action.type) {
      return false;
    }

    const { type } = action;
    let matched = false;
    if (typeof option === 'function') {
      // Test function
      matched = option(type, action);
    } else if (typeof option === 'string') {
      // String prefix
      matched = type.indexOf(option) === 0;
    } else if (Array.isArray(option)) {
      // Array of types
      matched = option.some(item => type.indexOf(item) === 0);
    }
    return matched;
}

export default function createSocketIoMiddleware(socket: any, criteria: any = [],
    { eventName = 'uploadRequest', execute = defaultExecute} = {}) {
    const emitBound = socket.emit.bind(socket);
    const onBound = socket.on.bind(socket);
    return ({ dispatch }: any) => {
        // TODO: Get the event name from current action
        return (next: any) => (action: any) => {
            if (evaluate(action, criteria)) {
                return execute(eventName, action, emitBound, onBound, next, dispatch);
            }
            
            return next(action);
        };
    };
}
  