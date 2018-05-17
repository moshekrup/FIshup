import * as React from 'react';
import Dropzone from 'react-dropzone';
import ListFiles from '../ListFiles';
import { FileUpload } from '../../store';

import './Dropzone.css';

const uploadSvg = require('./cloud-upload.svg');

export interface Props {
    files: FileUpload[];
    uploadReady: Boolean;
    isBeginUpload: Boolean;
    onDrop: (files: File[]) => void
    onUpload: (files: FileUpload[]) => void
}

export default class DropzoneFiles extends React.Component<Props> {
    uploadFilesToServer(e: React.MouseEvent<HTMLDivElement>, files: FileUpload[]) {
        const { onUpload } = this.props;
        e.stopPropagation();
        onUpload(files);
    }
    
    render(){
        const { files, uploadReady, isBeginUpload, onDrop } = this.props;
        return (
            <div>
                <Dropzone 
                    accept=".tar" 
                    className="dropzone" 
                    activeClassName="active-dropzone" 
                    onDrop={onDrop.bind(this)}>
                    {uploadReady ? 
                        <ListFiles arrFiles={files}/> :
                        <div className="container-text">
                            <img src={uploadSvg} className="upload-svg"/>
                            <p className="dropzone-text">Try dropping some files here, or click to select files to upload (.tar only).</p>
                        </div>
                    }
                    <div className={"upload-button" + (uploadReady ? " ready" : '') + (isBeginUpload ? " upload" : '')} 
                        onClick={(e) => this.uploadFilesToServer(e, files)}>upload</div>
                </Dropzone>
            </div>
        )
    }
}
