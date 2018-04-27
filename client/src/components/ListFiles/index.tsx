import * as React from 'react';
import FileDetails from '../FileDetails';
import { FileUpload, Status } from '../../store';

import './listFiles.css';

interface Properties {
    arrFiles: FileUpload[]
}

type Props = Properties;

class ListFiles extends React.Component<Props, Object> {
    render(){
        const { arrFiles } = this.props;
        if (arrFiles.length == 0)
            return <div></div>;

        const resultFiles = arrFiles.map(fileUpload => 
            <FileDetails key={fileUpload.guid.toString()} name={fileUpload.file.name} size={fileUpload.file.size} progress={fileUpload.progress}
                isUploading={fileUpload.status === Status.Uploding} isSuccess={fileUpload.status === Status.Success}
                error={fileUpload.error}/>)
        return (
            <div className="container">
                { resultFiles }
            </div>
        )
    }
}

export default ListFiles;