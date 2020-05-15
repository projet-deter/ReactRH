import React from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAuth} from '../../provider';

import OffersCandidate from '../Candidate/Offers';
import AddToken from '../Candidate/AddToken';
import Profile from '../Profile';
import OffersRecruiter from '../Recruiter/Offers';
import FormOffer from '../Recruiter/FormOffer';

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

              if (
                route.name === 'Offres' ||
                route.name === 'Offres Recruteur'
              ) {
                return <Icon name="th-list" size={30} color="#900" />;
              } else if (
                route.name === 'Ajouter une offre' ||
                route.name === 'Ajouter une offre Recrutement'
              ) {
                return <Icon name="plus" size={30} color="#900" />;
              } else if (route.name === 'Profile') {
                return <Icon name="user" size={30} color="#900" />;
              }

              // You can return any component that you like here!
              return <Icon name="rocket" size={30} color="#900" />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          {/* {user && user.admin && (
            <Tab.Screen name="Home" component={OffersRecruiter} />
          )} */}
          {user.admin && (
            <Tab.Screen name="Ajouter une offre" component={AddToken} />
          )}
          {user.admin && (
            <Tab.Screen name="Offres" component={OffersCandidate} />
          )}

          {user.admin && <Tab.Screen name="Profile" component={Profile} />}
          {user.admin && (
            <Tab.Screen
              name="Ajouter une offre Recruteur"
              component={FormOffer}
            />
          )}
          {user.admin && (
            <Tab.Screen name="Offres Recruteur" component={OffersRecruiter} />
          )}
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
