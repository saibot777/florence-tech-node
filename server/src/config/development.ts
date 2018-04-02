const envalid = require('envalid');

export const mongoURI = 'mongodb://admin:admin@ds123029.mlab.com:23029/florence';
exports.environment = envalid.cleanEnv(process.env, {
        TEMP: envalid.str({
            default: 'temp/upload'
        })
});