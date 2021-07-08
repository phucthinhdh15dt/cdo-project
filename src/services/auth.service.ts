import { Post } from './base.service';

// const { REACT_APP_AUTH_API_URL } = process.env;
const  REACT_APP_AUTH_API_URL  = process.env.REACT_APP_AUTH_API_URL;

const config = { baseURL: REACT_APP_AUTH_API_URL };

export const loginAPI = (payload) => Post('/auth/signin', payload, config);

export const signUpAPI = (payload) => Post('/auth/signup', payload, config);

