import * as React from 'react';
import Dropzone from 'react-dropzone';
import ListFiles from '../../components/ListFiles';
import { Dispatch, connect } from 'react-redux';
import { addFiles, uploadFiles, ActionFiles } from '../../actions';
import { StoreState, FileUpload, Status } from '../../store/';
import './dropzone.css';

const uploadSvg = require('./cloud-upload.svg');

interface Actions {
    onDrop: (files: File[]) => void
    onUpload: (files: FileUpload[]) => void
}

export interface Properties{
    files: FileUpload[];
    uploadReady: Boolean;
    isBeginUpload: Boolean;
}

type Props = Actions & Properties;

class DropzoneFiles extends React.Component<Props, Object>{
    uploadFilesToServer(e: React.MouseEvent<HTMLDivElement>, files: FileUpload[]){
        const { onUpload } = this.props;
        e.stopPropagation();
        onUpload(files);
    }
    
    render(){
        const { files, uploadReady, isBeginUpload, onDrop } = this.props;
        var child = uploadReady ? 
            <ListFiles arrFiles={files}/> :
            (
                <div className="container-text">
                    <img src={uploadSvg} className="upload-svg"/>
                    <p className="dropzone-text">Try dropping some files here, or click to select files to upload (.tar only).</p>
                </div>
            )
        return (
            <div>
                <Dropzone accept=".tar" className="dropzone" activeClassName="active-dropzone" onDrop={onDrop.bind(this)}>
                    {child}
                    <div className={"upload-button" + (uploadReady ? " ready" : '') + (isBeginUpload ? " upload" : '')} 
                        onClick={(e) => this.uploadFilesToServer(e, files)}>upload</div>
                </Dropzone>
            </div>
        )
    }
}

export function mapStateToProps({files}: StoreState): Properties {
    return {
        files,
        uploadReady: files.length !== 0,
        isBeginUpload: files.length !== 0 && files[0].status === Status.Uploding
    };
}

export function mapDispatchToProps(dispatch: Dispatch<ActionFiles>): Actions {
    return {
        onDrop: (files) => dispatch(addFiles(files)),
        onUpload: (files) => dispatch(uploadFiles(files))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneFiles);