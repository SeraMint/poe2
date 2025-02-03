const request = async (
  endpoint: string,
  method: string = 'GET',
  body?: object
) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const init: RequestInit = {
    method,
    headers
  };

  if (body) init.body = JSON.stringify(body);

  try {
    const response = await fetch(endpoint, init);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    return await response.json();
  } catch (e) {
    return e;
  }
};

export const get = (endpoint: string) => request(endpoint, 'GET');
export const post = (endpoint: string, body: object) =>
  request(endpoint, 'POST', body);
export const put = (endpoint: string, body: object) =>
  request(endpoint, 'PUT', body);
export const del = (endpoint: string) => request(endpoint, 'DELETE');
