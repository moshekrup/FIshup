import * as React from 'react';
import FileDetails from '../FileDetails';
import { FileUpload, Status } from '../../store';

import './ListFiles.css';

export interface Props {
    arrFiles: FileUpload[]
}

class ListFiles extends React.Component<Props> {
    render(){
        const { arrFiles } = this.props;
        return (
            <div className="container">
                { arrFiles.length > 0 && 
                arrFiles.map(fileUpload => 
                    <FileDetails 
                        key={fileUpload.guid.toString()} 
                        name={fileUpload.file.name} 
                        size={fileUpload.file.size} 
                        progress={fileUpload.progress}
                        isUploading={fileUpload.status === Status.Uploading} 
                        isSuccess={fileUpload.status === Status.Success}
                        error={fileUpload.error}
                    />
                )}
            </div>
        )
    }
}

export default ListFiles;