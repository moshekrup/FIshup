import { eventName, criteria} from './constants';

import createSocketIoMiddleware from './api';
import * as io from 'socket.io-client';

const SERVER = '/';
const socket = io(SERVER);

export default createSocketIoMiddleware(socket, criteria, {eventName});