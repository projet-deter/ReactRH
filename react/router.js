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
    Home: HomeScreen,
    UpdateProfile: UpdateProfileScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

//Create Routes
const AuthStack = createStackNavigator(
  {
    Register: RegisterScreen,
    Login: LoginScreen,
    Username: UsernameScreen,
    ForgotPassword: ForgotPasswordScreen,
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
