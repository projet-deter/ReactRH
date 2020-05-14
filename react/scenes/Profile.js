import React, {useState} from 'react';

import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
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
    <View
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
        <Avatar.Text
          size={72}
          style={{alignSelf: 'center'}}
          label={
            user
              ? user.firstname.substring(0, 1).toUpperCase()
              : '' + user
              ? user.lastname.substring(0, 1).toUpperCase()
              : ''
          }
        />
        <Title style={{alignSelf: 'center'}}>{`${user ? user.firstname : ''} ${
          user ? user.lastname : ''
        }`}</Title>

        <Form {...formProps}>
          <View style={[styles.footer]}>
            <TouchableOpacity
              onPress={() => {
                handleLogout();
                replace('Login');
              }}>
              <Text style={[styles.footerCTA]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Form>

        {/* <CTA
          ctaText={'Logout'}
          onPress={() => {
            // handleLogout();
            console.log(navigate, navigator);
            replace('Login');
          }}
        /> */}

        {/* <Button
          title={'Update Profile'}
          onPress={() => navigate('UpdateProfile')}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 25,
    color: '#362068',
    fontWeight: '400',
    fontFamily: 'Helvetica Neue',
  },
  footer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    color: '#636466',
  },

  footerCTA: {
    fontSize: 16,
    color: '#733AC2',
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
  },
  errorText: {
    marginBottom: 8,
    color: 'red',
  },
});
