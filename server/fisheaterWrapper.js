const fisheater = require('fisheater2')
const tmp = require('tmp')
const fs = require('fs')
const tar = require('tar-fs')
const Stream = require('stream')
const typesOfMsgs = require('./constants.js').typeOfMsg

class fisheaterWrapper {
    static upload(uploadRequest, updateCallback) {
        uploadRequest.payload.forEach((element) => {
            let bufferStream = new Stream.PassThrough()
            tmp.dir({
                unsafeCleanup: true
            },(err, path, cleanupCallback) => {
                if (err) throw err
                bufferStream.end(element.file)
                let stream = bufferStream.pipe(tar.extract(path))
                stream.on('finish', () => {
                    fisheater.publishDirectory('npm', path, (typeOfMsg, content) => {
                        if (typeOfMsg == typesOfMsgs.fatalError || typeOfMsg == typesOfMsgs.finished) 
                            cleanupCallback()
                        
                        content.guid = element.guid
                        updateCallback(typeOfMsg, content)
                    })
                })
            })
        })
    }
}


module.exports = fisheaterWrapper