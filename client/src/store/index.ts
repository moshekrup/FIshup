import { Store } from 'redux';
import Guid from '../common/guidWrapper';

export interface FileUpload {
    guid: Guid
    status: Status,
    error?: string,
    progress: number,
    file: File
}

export enum Status {
    Wait = 1,
    Success,
    Failure,
    Uploading,
}

export interface StoreState {
    files : FileUpload[]
}

export interface ConfigStore<S>{
    (preState?: any): Store<S>
}

var configureStore: ConfigStore<StoreState>;

if (process.env.NODE_ENV === 'production') 
    configureStore = require('./configureStore.prod').default;
else 
    configureStore = require('./configureStore.dev').default;

export default configureStore;
  