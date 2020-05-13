import axios from 'axios';
import * as c from '../constants';

// REGISTER ================================================
// makes API request to register the user.
// Accepts users data as parameter.
export async function register(data) {
  try {
    let res = await axios.post(c.REGISTER, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}
// LOGIN ==================================================
// makes API request to login the user.
// Accepts users data as parameter.
export async function login(data) {
  try {
    let res = await axios.post(c.LOGIN, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}
// FORGOTPASSWORD =========================================
// makes API request to login the user.
// Accepts users 'email' in an object as parameter.
export async function forgotPassword(data) {
  try {
    let res = await axios.post(c.FORGOT_PASSWORD, data);

    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

// UPDATEPROFIL ============================================
// makes API request to update users data.
// Accepts userId and data as parameter.

// Loops through the data passed to create a FormData object.
// An axios options object is created with the content type set to "multipart/form-data" to allow for image upload.
export async function updateProfile(userId, data) {
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    const form_data = new FormData();
    for (let key in data) {
      form_data.append(key, data[key]);
    }

    let res = await axios.put(
      `${c.UPDATE_PROFILE}/${userId}`,
      form_data,
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
