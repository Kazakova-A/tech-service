import fetch from 'node-fetch';

const getFetchedData = async (
  url: string,
  payload?: { [key: string]: any, },
): Promise<any> => {
  try {
    const result = await fetch(url, payload);
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
};

export default getFetchedData;
