import React, {useState} from 'react';
import {View} from 'react-native';

import * as api from '../../services/auth';
import {useAuth} from '../../provider';

import Form from 'react-native-basic-form';
import CTA from '../../components/CTA';
import {Header, ErrorText} from '../../components/Shared';

export default function Login(props) {
  const {navigation} = props;
  const {navigate} = navigation;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {handleLogin} = useAuth();

  const fields = [
    {name: 'email', label: 'Email Address', required: true},
    {name: 'password', label: 'Password', required: true, secure: true},
  ];

  function onSubmit(state) {
    setLoading(true);

    return handleLogin({token: 'toto', user: {username: 'Maxime'}})
      .then(() => {
        setLoading(false);
        let username = 'Maxime'; //response.user.username !== null;
        console.log(username);
        if (username) {
          navigate('App');
        } else {
          navigation.replace('Username');
        }
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }

  let formProps = {title: 'Login', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <Header title={'Login'} />
      <View style={{flex: 1}}>
        <ErrorText error={error} />
        <Form {...formProps}>
          <CTA
            ctaText={'Forgot Password?'}
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{marginTop: 20}}
          />

          <CTA
            title={"Don't have an account?"}
            ctaText={'Register'}
            onPress={() => navigation.replace('Register')}
            style={{marginTop: 50}}
          />
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
