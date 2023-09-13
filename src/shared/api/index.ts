import axios from "axios";
import { appActions } from "store/slices/app.slice";
import { store } from "store/store";

const BASE_URL: string = "https://hacker-news.firebaseio.com";

export const api = axios.create({
  baseURL: BASE_URL + "/v0/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (request) {
    store.dispatch(appActions.setLoading(true));
    return request;
  },
  function (error) {
    return error;
  }
);

api.interceptors.response.use(
  function (response) {
    store.dispatch(appActions.setLoading(false));
    return response;
  },
  function (error) {
    store.dispatch(appActions.setLoading(false));
    store.dispatch(appActions.setErrorMessage(error.response.error));

    return error;
  }
);
