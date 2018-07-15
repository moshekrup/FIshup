const Fisheater = require('./fisheater');
const tmp = require('tmp');
const fse = require('fs-extra');
const tar = require('tar-fs');
const Stream = require('stream');
const path = require('path');
const typesOfMsgs = require('./constants.js').typeOfMsg;

const packageManager = 'npm'; // TODO get from client

class FisheaterWrapper {
    static async upload(uploadRequest, updateCallback) {
        uploadRequest.payload.forEach((element) => {
            const bufferStream = new Stream.PassThrough();
            tmp.dir({
                unsafeCleanup: true
            },(err, rootPath, cleanupCallback) => {
                if (err) {
                    updateCallback(
                        typesOfMsgs.fatalErr, 
                        { guid: element.guid, message: err.message });
                    cleanupCallback();
                }

                bufferStream.end(element.file);
                const stream = bufferStream.pipe(tar.extract(rootPath));
                stream.on('finish', async () => {
                    try {
                        const packages = await fse.readdir(rootPath);
                        let amountFilesFinished = 0;
                        const publishPromises = packages.map(async (packagePath) => {
                            const fullPath = path.join(rootPath, packagePath);
                            await Fisheater.publishDirectory(packageManager, fullPath, (typeOfMsg, content) => {
                                const progressPercentage = typeOfMsg === typesOfMsgs.updateProgress ?
                                    { progressPercentage: (amountFilesFinished += content.progressPercentage) / packages.length } : {}

                                updateCallback(typeOfMsg, { ...content, ...progressPercentage, guid: element.guid });
                            });
                        })

                        await Promise.all(publishPromises);
                        updateCallback(typesOfMsgs.finished, { guid: element.guid });
                    } catch (err){
                        updateCallback(typeOfMsgs.fatalErr, { message: err });
                    }
                    finally {
                        cleanupCallback();
                    }
                });
            })
        })
    }
}

module.exports = FisheaterWrapper