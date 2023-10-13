import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://master--relaxed-fenglisu-464c83.netlify.app/.netlify/functions',
});

export default api;