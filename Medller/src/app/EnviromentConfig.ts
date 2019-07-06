import {environment} from '../environments/environment'
const config = {

    subdomainApiServer: environment.subdomainApiServer,

    development: {
        host: '0.0.0.0'

    },
    test: {
        host: 'localhost'

    },
    production: {
        host: '192.168.0.13'

    }
};
export const Config = config;
export const URL = config.test.host;

