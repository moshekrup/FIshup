import logger from 'redux-logger';
import Files from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import socketIoMiddleware from '../middleware';

function configureStore(preState?: any) {
    return createStore(
        Files,
        preState,
        applyMiddleware(logger, socketIoMiddleware)
    )
}

export default configureStore;