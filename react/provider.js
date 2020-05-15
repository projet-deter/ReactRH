import React, {useMemo, useReducer, useContext} from 'react';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, {
  initialState,
  LOGGED_IN,
  LOGGED_OUT,
  GET_OFFER,
} from './reducer';

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState || {});

  // Get Auth state =================================== RETURN DATA USER si login
  const getAuthState = async () => {
    try {
      //GET TOKEN && USER
      let token = await AsyncStorage.getItem(TOKEN_KEY);
      let user = await AsyncStorage.getItem(USER_KEY);
      user = JSON.parse(user);

      if (token !== null && user !== null) {
        await handleLogin({token, user});
      } else {
        await handleLogout();
      }

      return {token, user};
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle Login ===================================
  // ========== stocke le jeton et les données des utilisateurs,
  // ========== définit l'en-tête Autorisation Axios
  // ========== et envoie les données des utilisateurs au réducteur à enregistrer.
  const handleLogin = async data => {
    try {
      //STORE DATA
      console.log(data);
      let {token} = data;

      let data_ = [[TOKEN_KEY, token]];

      // Stocker plusieurs paires clé-valeur. Une fois l'opération terminée, on recois un seul rappel avec nptq erreurs:
      await AsyncStorage.multiSet(data_);

      //AXIOS AUTHORIZATION HEADER
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      //DISPATCH TO REDUCER
      dispatch({type: LOGGED_IN, user: data.user});
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle Logout ===================================
  // ========== retire toute les donnée données stockée
  const handleLogout = async () => {
    try {
      //REMOVE DATA
      await AsyncStorage.multiRemove(keys);

      //AXIOS AUTHORIZATION HEADER
      delete axios.defaults.headers.common['Authorization'];

      //DISPATCH TO REDUCER
      dispatch({type: LOGGED_OUT});
    } catch (error) {
      throw new Error(error);
    }
  };

  //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER ===================================
  // ========== MAJ des données USER dans le local storage
  // ========== et envoir les nouvelles données au REDUCER pour les enregistrer
  const updateUser = async user => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch({type: LOGGED_IN, user}); //DISPATCH TO REDUCER
    } catch (error) {
      throw new Error(error);
    }
  };

  const getOfferById = async offer => {
    try {
      dispatch({type: GET_OFFER, offer}); //DISPATCH TO REDUCER
    } catch (error) {
      throw new Error(error);
    }
  };

  // ==== Les hooks avec des dépendances, tels que useEffect, useMemo et useCallback,
  // seront toujours MAJ lors de l'actualisation rapide.
  // Leur liste de dépendances sera ignorée pendant l'actualisation rapide.
  const value = useMemo(() => {
    return {
      state,
      getAuthState,
      handleLogin,
      handleLogout,
      updateUser,
      getOfferById,
    };
  }, [state]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

// ================ Objet useAuth est créé avec hook useContext et du AuthContext
// ================ Cet objet représente la valeur de contexte actuelle pour notre contexte
const useAuth = () => useContext(AuthContext);

export {AuthContext, useAuth};
export default AuthProvider;
