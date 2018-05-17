import { ActionFiles, ADD_FILES, UPLOAD_REQUEST,
    UPLOAD_FAILED, UPDATE_PROGRESS, UPLOAD_FINISHED } from '../actions';
import { StoreState, Status } from '../store/';
import Guid from '../common/guidWrapper';

// TODO change to FileState
const initState: StoreState = {files: []};

export function Files(state: StoreState = initState, action: ActionFiles): StoreState {
    switch(action.type){
        case ADD_FILES:
            return {
                ...state,
                files: [...state.files, ...action.payload.map(f => 
                    {
                        return {guid: new Guid(), file:f,progress:0, status: Status.Wait, error: undefined}
                    }
                )]
            }
        case UPLOAD_REQUEST: {
            return {
                ...state,
                files: state.files.map(f => { return { ...f, status: Status.Uploading} }) 
            }
        }
        case UPDATE_PROGRESS: {
            return {
                ...state,
                files: state.files.map(f => f.guid.toString() === action.payload.guid.toString() ?
                    // transform the one with a matching id
                    { ...f, 
                        progress: action.payload.progressPercentage} : 
                    // otherwise return original todo
                    f
                ) 
            }
        }
        case UPLOAD_FINISHED: {
            return {
                ...state,
                files: state.files.map(f => f.guid.toString() === action.payload.guid ?
                    // transform the one with a matching id
                    { ...f, 
                        progress: 100,
                        status: Status.Success } : 
                    // otherwise return original todo
                    f
                ) 
            }
        }
        case UPLOAD_FAILED: {
            return {
                ...state,
                files: state.files.map(f => f.guid.toString() === action.payload.guid ?
                    // transform the one with a matching id
                    { ...f, 
                        error: action.payload.message,
                        status: Status.Failure } : 
                    // otherwise return original todo
                    f
                ) 
            }
        }
        default:
            return state
    }
}

export default Files;