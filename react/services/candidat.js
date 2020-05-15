import axios from 'axios';
import * as c from '../constants';

// GET OFFER BY ID ==================================================
// makes API request to login the user.
// Accepts users data as parameter.
export async function getOfferDetailById(id) {
  console.log(id);
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    let res = await axios.get(c.CANDIDAT_OFFER_SHOW + '/' + {id}, options);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// POST CANDIDATURE ==================================================
// makes API request to login the user.
// Accepts users data as parameter.
export async function candidature(id, data) {
  console.log(data);
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    let res = await axios.post(
      c.CANDIDAT_OFFER_SHOW + '/' + {id} + '/candidature',
      data,
      options,
    );

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
