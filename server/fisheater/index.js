const Npm = require('./providers/npm');
const typesOfMsgs = require('../constants').typeOfMsg;
const fse = require('fs-extra');
const path = require('path');

const ignoreFiles = ['packages'];

const providers = {
    npm: Npm,
}

class Fisheater {
    /**
     * Publish directory full of modules to a given package manager
     * @param {String} manager Package manager name
     * @param {String} basePath Local repository directory
     * @param {Function} callback Callback function (err)
     */
    static async publishDirectory(manager, basePath, updateCallback) {
        const provider = providers[manager];
        if (!provider) {
            throw new Error('this package manager is not supported!');
        }
        
        const files = await fse.readdir(basePath);
        const publishFiles = files.filter(f => !ignoreFiles.includes(f))

        const promisesFiles = publishFiles.map(async (f) => {
            const fullPath = path.join(basePath, f);
            const messageResult = await provider.publishModule(fullPath);
            updateCallback(
                typesOfMsgs.updateProgress, 
                { progressPercentage: 1 / publishFiles.length * 100, message: messageResult }
            );
        });

        try {
            await Promise.all(promisesFiles);
        } catch (err) {
            updateCallback(
                typesOfMsgs.err, 
                // TODO: get only name
                { message: `failed to upload package ${basePath} error: ${err.message}`}
            );
        }
    }
}

module.exports = Fisheater;