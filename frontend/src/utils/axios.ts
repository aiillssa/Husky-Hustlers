import axios from 'axios';

//Base URL of the back end server
export default axios.create({
    baseURL: 'http://localhost:8088',
    withCredentials: true
});
export {};