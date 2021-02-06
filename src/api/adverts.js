import client from './client';

const { REACT_APP_API_VERSION_URL: apiVersion } = process.env;

export const getAdverts = () => {
  const url = `${apiVersion}/adverts`;
  return client.get(url);
};

export const getAdvertsWithFilters = filters => {
  const url = `${apiVersion}/adverts`;
  console.log(url);
  return client.get(url, {
    params: filters,
  });
};

export const getAdvertDetail = advertId => {
  const url = `${apiVersion}/adverts/${advertId}`;
  return client.get(url);
};

export const createAdvert = advert => {
  const url = `${apiVersion}/adverts`;
  return client.post(url, advert);
};

export const deleteAdvert = advertId => {
  const url = `${apiVersion}/adverts/${advertId}`;
  return client.delete(url);
};
