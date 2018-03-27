const envalid = require('envalid');

export const env = {
    mongoURI: 'mongodb://admin:admin@ds113019.mlab.com:13019/amazon-clone',
    temp: envalid.cleanEnv(process.env, {
        TEMP: envalid.str({
            default: 'temp/upload'
        })
    })
};