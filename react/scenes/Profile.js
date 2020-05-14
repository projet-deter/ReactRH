import React, {useState} from 'react';

import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import Form from 'react-native-basic-form';
import CTA from '../components/CTA';

import {useAuth} from '../provider';

export default function Home(props) {
  const {navigate, replace} = props.navigation;
  const [loading, setLoading] = useState(false);
  function onSubmit(state) {
    setLoading(true);
  }

  const {state, handleLogout} = useAuth();
  const user = state.user;

  const fields = [
    {name: 'firstname', label: 'Prénom'},
    {name: 'lastname', label: 'Nom'},
  ];

  let formProps = {
    title: 'Valider',
    fields,
    onSubmit,
    loading,
    initialData: {...user},
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <View style={{alignSelf: 'center'}}>
          <Avatar.Text
            size={72}
            style={{alignSelf: 'center'}}
            label={
              user.firstname.substring(0, 1).toUpperCase() +
              user.lastname.substring(0, 1).toUpperCase()
            }
          />
          <Title>{`${user.firstname} ${user.lastname}`}</Title>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Form {...formProps} />
        </View>
      </View>
    </ScrollView>
  );
}
