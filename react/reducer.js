//Action Types
export const LOGGED_IN = 'auth/LOGGED_IN';
export const LOGGED_OUT = 'auth/LOGGED_OUT';
export const GET_OFFER = 'auth/GET_OFFER';
export const NEW_OFFER = 'auth/NEW_OFFER';

export const initialState = {
  isLoggedIn: false,
  user: null,

  offers: null,
  offer: null,
  candidates: null,
};

//REDUCER
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN: {
      let {user} = action;

      return {...state, isLoggedIn: true, user};
    }

    case LOGGED_OUT: {
      return {...state, ...initialState};
    }

    default:
      return state;
  }
};

export default authReducer;

export const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFER: {
      let {offer} = action;

      return {...state, isLoggedIn: true, offer};
    }

    case NEW_OFFER: {
      let {offer} = action;

      return {...state.offers, isLoggedIn: true, offer};
    }

    default:
      return state;
  }
};
