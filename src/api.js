// @flow

const API = 'https://min-api.cryptocompare.com';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};

export const get = async (uri: string): Promise<Object> => {
  const response = await fetch(`${API}/${uri}`, {
    method: 'GET',
    headers,
  });
  return response.json();
};
