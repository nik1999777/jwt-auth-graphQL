export const setAccessToken = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getAccessToken = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
