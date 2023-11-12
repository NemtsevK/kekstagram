import {errorGetData} from './error-get-data.js';
import {errorSendData} from './error-send-data.js';

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

//взаимодействие с сервером
const load = (route, error, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error);

//получить данные от сервера
const getData = () => load(Route.GET_DATA, errorGetData);

//отправить данные на сервер
const sendData = (body) => load(Route.SEND_DATA, errorSendData, Method.POST, body);

export {getData, sendData};
