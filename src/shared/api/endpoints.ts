export const endpoints = {
  newsIds: "/newstories.json",
  news: (id: number) => `/item/${id}.json`,
};
