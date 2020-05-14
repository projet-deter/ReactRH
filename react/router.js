import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//IMPORT ROUTES

import AuthLoading from './scenes/auth/AuthLoading';

//IMPORT SCENES
import RegisterScreen from './scenes/auth/Register';
import LoginScreen from './scenes/auth/Login';
import UsernameScreen from './scenes/auth/Username';
import ForgotPasswordScreen from './scenes/auth/ForgotPassword';

import HomeScreen from './scenes/home/Home';
import UpdateProfileScreen from './scenes/home/UpdateProfile';

const HomeStack = createStackNavigator(
  {
    ReactRH: HomeScreen,
    UpdateProfile: UpdateProfileScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'ReactRH',
  },
);

//Create Routes
const AuthStack = createStackNavigator(
  {
    Register: {screen: RegisterScreen},
    Login: {screen: LoginScreen},
    Username: {screen: UsernameScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
  },
  {
    initialRouteName: 'Login',
  },
);

//APP ROUTES STACK
const AppStack = createSwitchNavigator(
  {
    Loading: {
      screen: AuthLoading,
    },
    Auth: {
      screen: AuthStack,
    },
    App: {
      screen: HomeStack,
    },
  },
  {initialRouteName: 'Loading'},
);

const Router = createAppContainer(AppStack);

export default Router;
