import { FileUpload } from '../store';

export const ADD_FILES = 'ADD_FILES';
export type ADD_FILES = typeof ADD_FILES;

export const UPLOAD_REQUEST = 'server/upload';
export type UPLOAD_REQUEST = typeof UPLOAD_REQUEST;

export const UPLOAD_FINISHED = 'UPLOAD_FINISHED';
export type UPLOAD_FINISHED = typeof UPLOAD_FINISHED;
export const UPLOAD_FAILED = 'UPLOAD_FAILED';
export type UPLOAD_FAILED = typeof UPLOAD_FAILED;
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export type UPDATE_PROGRESS = typeof UPDATE_PROGRESS;

export type ActionFiles = AddFiles | UploadFiles | UploadFileFinished | UploadFileFailed | UpdateProgressFile;

export interface UploadFileFinished {
    type: UPLOAD_FINISHED;
    payload: { guid: string };
}

export interface UploadFileFailed {
    type: UPLOAD_FAILED;
    payload: { guid: string, message: string };
}

export interface UpdateProgressFile {
    type: UPDATE_PROGRESS;
    payload: { guid: string, progressPercentage: number, message: string };
}

export interface AddFiles {
    type: ADD_FILES;
    payload: File[];
}

export interface UploadFiles {
    type: UPLOAD_REQUEST;
    returnTypes: StatusUploadedFile[];
    payload: { guid: string, file: File } [];
}

export type StatusUploadedFile = UPLOAD_FINISHED | UPLOAD_FAILED | UPDATE_PROGRESS;

export function addFiles(files: File[]): AddFiles {
    return({
            type: ADD_FILES,
            payload: files
        }
    )
}

export function uploadFiles(files: FileUpload[]): UploadFiles {
    return({
            type: UPLOAD_REQUEST,
            returnTypes: [UPLOAD_FINISHED, UPLOAD_FAILED, UPDATE_PROGRESS],
            payload: files.map(f => {return {guid: f.guid.toString(), file: f.file}})
        }
    )
}