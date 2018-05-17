import Dropzone from '../../components/Dropzone';
import { Dispatch, connect, Component } from 'react-redux';
import { addFiles, uploadFiles, ActionFiles } from '../../actions';
import { StoreState, FileUpload, Status } from '../../store/';

export interface OwnProps {}

export interface DispatchProps {
    onDrop: (files: File[]) => void
    onUpload: (files: FileUpload[]) => void
}

export interface StoreProps {
    files: FileUpload[];
    uploadReady: Boolean;
    isBeginUpload: Boolean;
}

export function mapStateToProps({files}: StoreState): StoreProps {
    return {
        files,
        uploadReady: files.length !== 0,
        isBeginUpload: files.length !== 0 && files[0].status === Status.Uploading
    };
}

export function mapDispatchToProps(dispatch: Dispatch<ActionFiles>): DispatchProps {
    return {
        onDrop: (files) => dispatch(addFiles(files)),
        onUpload: (files) => dispatch(uploadFiles(files))
    };
}

const Components: Component<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(Dropzone);
export default Components;