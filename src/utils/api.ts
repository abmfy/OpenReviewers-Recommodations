import axios from 'axios';

import config from '../config/config.json';

export default axios.create({
    baseURL: config.backend_url + ':' + config.backend_port + '/',
    timeout: 1000,
});