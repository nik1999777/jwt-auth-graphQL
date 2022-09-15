export const setAccessToken = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getAccessToken = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
