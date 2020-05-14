import React from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAuth} from '../../provider';

import OffersCandidat from '../Candidate/Offers';
import AddToken from '../Candidate/AddToken';
import Profile from '../Profile';

const Tab = createBottomTabNavigator();

export default function Home(props) {
  const {navigate} = props.navigation;

  const {state, handleLogout} = useAuth();
  const user = state.user;

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Offres') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-cirrcle-outline';
              } else if (route.name === 'Ajouter une offre') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          {user && user.admin && (
            <Tab.Screen name="Home" component={OffersCandidat} />
          )}
          {user && user.admin && (
            <Tab.Screen name="Home2" component={OffersCandidat} />
          )}
          {user && !user.admin && (
            <Tab.Screen name="Offres" component={OffersCandidat} />
          )}
          {user && !user.admin && (
            <Tab.Screen name="Ajouter une offre" component={AddToken} />
          )}
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
      <Button
        title={'Log Out'}
        onPress={() => {
          handleLogout();
          navigate('Auth');
        }}
      />
    </>
  );
}
