export const setStorage = (id: string, data: any = {}) => {
  localStorage.setItem(id, JSON.stringify(data));
};

export const getStorage = (id: string) => {
  const data = localStorage.getItem(id);

  if (!data) return null;

  return JSON.parse(data);
};

export const rmStorageItem = (id: string) => {
  return localStorage.removeItem(id);
};
