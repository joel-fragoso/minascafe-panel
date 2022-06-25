import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.minascafe.local',
});

export default api;
