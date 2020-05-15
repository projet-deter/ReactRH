import axios from 'axios';
import * as c from '../constants';

// POST OFFER ================================================
// makes API request to post a new offer.
// Accepts offer data as parameter.
export async function post(data) {
  try {
    let res = await axios.post(c.ADMIN_OFFERS, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// HANDLE ERROR ==========================================
export function handler(err) {
  let error = err;

  if (err.response && err.response.data.hasOwnProperty('message')) {
    error = err.response.data;
  } else if (!err.hasOwnProperty('message')) {
    error = err.toJSON();
  }

  return new Error(error.message);
}
