const typeOfMsg = {
    fatalErr: "fatalErr",
    updateProgress: "updateProgress",
    err: "err",
    finished: "finished"
}

exports.registry = process.PRIVATE_REGISTRY || 'http://localhost:4873';;
exports.typeOfMsg = typeOfMsg;