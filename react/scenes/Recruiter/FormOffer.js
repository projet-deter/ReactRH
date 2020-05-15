import React, {useState} from 'react';

import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import * as api from '../../services/offer';

import Form, {TYPES} from 'react-native-basic-form';

export default function FormOffer(props) {
  const {navigation} = props;

  //1 - DECLARE VARIABLES
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = [
    {label: 'Stage', value: 'stage'},
    {label: 'Alternance', value: 'alternance'},
    {label: 'Intérim', value: 'interim'},
    {label: 'CDD', value: 'cdd'},
    {label: 'CDI', value: 'cdi'},
  ];

  const fields = [
    {name: 'name', label: 'Titre du poste', required: true, type: TYPES.Text},
    {
      name: 'description',
      label: 'Description',
      required: true,
      type: TYPES.Text,
    },
    {name: 'place', label: 'Lieu', required: true, type: TYPES.Text},
    {name: 'begin', label: 'Date de début', required: true, type: TYPES.Text},
    {
      name: 'contract',
      label: 'Type de poste',
      required: true,
      type: TYPES.Dropdown,
      options: options,
    },
  ];

  async function onSubmit(state) {
    setLoading(true);

    try {
      let response = await api.post(state);
      setLoading(false);
      Alert.alert(
        'Votre offre a été créée avec succès.',
        response.message,
        [{text: 'OK', onPress: () => navigation.replace('Home')}],
        {cancelable: false},
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  let formProps = {title: 'Créer', fields, onSubmit, loading};
  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#fff'}}>
      <View style={[styles.header]}>
        <Text style={styles.headerText}>Nouvelle offre</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.errorText}>{error}</Text>
        <Form {...formProps} />
      </View>
    </View>
  );
}

FormOffer.navigationOptions = ({}) => {
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
