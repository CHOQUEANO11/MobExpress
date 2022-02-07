import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://api-itruckers.herokuapp.com'
})

export default myApi