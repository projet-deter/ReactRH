import React, {useState} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';

import * as api from '../../services/auth';

import Form from 'react-native-basic-form';

export default function ForgotPassword(props) {
  const {navigation} = props;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [{name: 'email', label: 'Email Address', required: true}];

  async function onSubmit(state) {
    setLoading(true);

    try {
      let response = await api.forgotPassword(state);
      setLoading(false);

      Alert.alert(
        'Recover Password',
        response.message,
        [{text: 'OK', onPress: () => navigation.goBack()}],
        {cancelable: false},
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  let formProps = {title: 'Submit', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <View style={[styles.header]}>
        <Text style={styles.headerText}>Recover Password</Text>
      </View>

      <View style={{flex: 1}}>
        <Text style={styles.errorText}>{error}</Text>
        <Form {...formProps} />
      </View>
    </View>
  );
}

ForgotPassword.navigationOptions = ({}) => {
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

  errorText: {
    marginBottom: 8,
    color: 'red',
  },
});
