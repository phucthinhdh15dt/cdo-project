// @flow
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import isServer from '../utils/is-server';
import * as cookie from 'js-cookie';
import * as _ from 'lodash';
import { TOKEN_KEY, REFRESH_TOKEN } from '../const/appConst';
import Router from 'next/router';
// import { parseISO } from 'date-fns';

const { REACT_APP_API_URL } = process.env;

export const getService = (params?: AxiosRequestConfig) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // if (localStorage[FACILITY_KEY]) headers['EHS-FacilityId'] = localStorage[FACILITY_KEY];

  // headers['EHS-TimeZone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let token = null;

  if (!isServer()) {
    token = cookie.get(TOKEN_KEY);
  }

  if (token && token !== 'undefined') {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: REACT_APP_API_URL,
    headers,
    ...params,
  });
};

export const transformResponse = ({ data }: AxiosResponse) => {
  // if (status === 403) {
  //   return Promise.reject(new Error("You don't have permission on this action!"));
  // }

  // if (!data) {
  //   return Promise.reject(new Error('Please check your network and try again.'));
  // }

  // if (!data.status) {
  //   return Promise.reject(new Error(data.message));
  // }
  return Promise.resolve(data);
};

// export const refreshTokenAPI = () => {
//   const values = localStorage[REFRESH_TOKEN];

//   if (!values) {
//     Router.push('/account/sign-out');

//     return Promise.reject();
//   }

//   return axios.post(`${process.env.REACT_APP_AUTH_API_URL}/RefreshAuth`, JSON.parse(values)).then(({ data }) => {
//     const { refreshToken, expiresIn, accessToken, username } = data.data || {};
//     const expires = new Date();
//     expires.setSeconds(expires.getSeconds() + expiresIn);

//     if (refreshToken) {
//       cookie.set(TOKEN_KEY, accessToken, { expires, sameSite: 'Lax' });
//       localStorage.setItem(REFRESH_TOKEN, JSON.stringify({ username, refreshToken }));
//     }
//   });
// };

const buildRequest = (req: Promise) => {
  return req()
    .catch((err: AxiosError) => {
      if (err.response && err.response.status === 401) {
        return refreshTokenAPI().then(() => req());
      }
      return err;
    })
    .then(transformResponse);
};

export const Get = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<object>> =>
  buildRequest(() => getService().get(url, config));

export const Post = (url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<object>> =>
  buildRequest(() => getService().post(url, data, config));

export const Put = (url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<object>> =>
  buildRequest(() => getService().put(url, data, config));

export const Delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<object>> =>
  buildRequest(() => getService().delete(url, config));
