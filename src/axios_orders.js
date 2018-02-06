import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://burger-builder-7b394.firebaseio.com/'
});

export default instance;