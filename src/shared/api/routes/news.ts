import { AxiosPromise } from "axios";
import { api } from "..";
import { endpoints } from "../endpoints";
import { NewsItem } from "types/news.types";

export const getItemIds = (): AxiosPromise<number[]> => {
  return api.get(endpoints.newsIds);
};

export const getItems = (id: number): AxiosPromise<NewsItem> => {
  return api.get(endpoints.news(id));
};
