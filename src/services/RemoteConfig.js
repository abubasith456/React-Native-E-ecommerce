let BASE_URL = 'https://hayat-shop.onrender.com'; // Default value

export const setBaseUrl = (url) => {
  BASE_URL = url;
};

export const getBaseUrl = () => {
  return BASE_URL;
};