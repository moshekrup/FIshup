import * as React from 'react';
import './fileDetails.css';
const successFileSvg = require('./assets/success.svg')
const errorFileSvg = require('./assets/errorUpload.svg');
const tarImg = require('./assets/books.svg')

export interface Props {
    name: string;
    size: number;
    progress: number;
    isSuccess: boolean;
    isUploading: boolean;
    error?: string
};

class FileDetails extends React.Component<Props, Object>{
    render() {
        const { name, size, progress, isSuccess, isUploading, error = null } = this.props;
        var progressStyle = {
            width: `${progress}%`
        }
        var baseClasses = "dz-preview dz-file-preview";
        return (
            <div>
                <div className={baseClasses + (isSuccess ? " dz-success" : error ? " dz-error": "")}>
                    {/* <a href="#" className="close-button">&#10006;</a> */}
                    <div className="dz-image"><img src={tarImg}/></div>
                    <div className="dz-details">
                        <div className="dz-filename"><span data-dz-name="">{name}</span></div>
                        <div className={"dz-size" + (isSuccess || isUploading || error ? " dz-size-hide": "")}>
                            <span data-dz-size=""><strong>{this.formatBytes(size)}</strong></span
                        ></div>
                    </div>
                    {isUploading && 
                    <div className="dz-progress">
                        <span className="dz-upload" data-dz-uploadprogress="" style={progressStyle}>
                        </span>
                    </div>}
                    {isSuccess &&
                    <div className="dz-success-mark">
                        <img src={successFileSvg}/>
                    </div>}
                    {/* Add error message */}
                    {error &&
                    <div className="dz-error-mark">
                        <img src={errorFileSvg}/>
                    </div>}
                    {error &&
                    <div className="dz-error-message">
                        {error}
                    </div>}
                </div> 
            </div>
        )
       
    }

    formatBytes(bytes: number,decimals: number = 0): string {
        if(bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

export default FileDetails;