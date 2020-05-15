import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import * as api from '../../services/auth';
import {useAuth} from '../../provider';

import Form, {TYPES} from 'react-native-basic-form';

export default function Login(props) {
  const {navigation} = props;
  const {navigate} = navigation;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {handleLogin} = useAuth();

  const fields = [
    {name: 'username', label: 'Email Address', required: true},
    {name: 'password', label: 'Password', required: true, secure: true},
  ];

  async function onSubmit(state, admin = false) {
    setLoading(true);

    try {
      //let response = await api.login(state);

      await handleLogin({
        token: 'toto',
        user: {
          admin: true,
          username: 'Ameena',
          firstname: 'Ameena',
          lastname: 'Aziz',
        },
      });

      setLoading(false);

      navigate('App');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  let formProps = {title: 'Login', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <View style={[styles.header]}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.errorText}>{error}</Text>

        <Form {...formProps}>
          <View style={[styles.footer]}>
            <Text style={[styles.footerText]}>Forgot Password? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={[styles.footerCTA]}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.footer]}>
            <Text style={[styles.footerText]}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text style={[styles.footerCTA]}>Register</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </View>
  );
}

Login.navigationOptions = ({}) => {
  return {
    title: ``,
  };
};

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
