const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const registry = require('../../constants').registry;

class Npm {
    static async publishModule(modulePath) {
        const module = path.basename(modulePath);
        try {
            await exec(`npm publish ${modulePath} --registry ${registry} --ignore-scripts`);
            return `${module} uploaded to npm`;
        } catch (err) {
            if (err.message.indexOf('EPUBLISHCONFLICT') > -1) 
                return `${module} already exists`;
            else if (err.message.indexOf('ELIFECYCLE') > -1) 
                return `${module} life cycle error`;
            else 
                throw err;
        }
    };
}

module.exports = Npm;