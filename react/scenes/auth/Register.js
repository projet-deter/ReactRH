import React, {useState} from 'react';

import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import * as api from '../../services/auth';

import Form, {TYPES} from 'react-native-basic-form';

export default function Register(props) {
  const {navigation} = props;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = [{label: 'Admin', value: 1}, {label: 'User', value: 2}];

  const fields = [
    {name: '_username', label: 'Email Address', required: true},
    {name: '_password', label: 'Password', required: true, secure: true},
  ];

  async function onSubmit(state) {
    setLoading(true);

    try {
      let response = await api.register(state._username, state._password);
      setLoading(false);
      Alert.alert(
        'Registration Successful',
        response.message,
        [{text: 'OK', onPress: () => navigation.replace('Login')}],
        {cancelable: false},
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  let formProps = {title: 'Register', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <View style={[styles.header]}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.errorText}>{error}</Text>

        <Form {...formProps}>
          <View style={[styles.footer]}>
            <Text style={[styles.footerText]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={[styles.footerCTA]}>Login</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </View>
  );
}

Register.navigationOptions = ({}) => {
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
