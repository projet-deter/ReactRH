import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import * as api from '../../services/auth';
import {useAuth} from '../../provider';

import Form from 'react-native-basic-form';

export default function Username(props) {
  const {navigation} = props;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {state, updateUser} = useAuth();

  const fields = [{name: 'username', label: 'Username', required: true}];

  async function onSubmit(data) {
    setLoading(true);

    try {
      let response = await api.updateProfile(state.user._id, data);
      updateUser(response.user);

      setLoading(false);

      navigation.navigate('App');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  let formProps = {title: 'Submit', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <View style={[styles.header]}>
        <Text style={styles.headerText}>Username</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.errorText}>{error}</Text>;
        <Form {...formProps} />
      </View>
    </View>
  );
}

Username.navigationOptions = ({}) => {
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
