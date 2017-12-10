import request from '../../utils/request';

export const fetchLogin = async (url, options) => {
  try {
    const response = await request(url, options);
    return response;
  } catch (e) {
    return e;
  }
  
}
