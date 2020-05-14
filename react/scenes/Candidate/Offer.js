import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  Title,
  Paragraph,
  Subheading,
  Button,
  Badge,
} from 'react-native-paper';
import Form from 'react-native-basic-form';

import {useAuth} from '../../provider';

export default function Home(props) {
  const [loading, setLoading] = useState(false);
  function onSubmit(state) {
    setLoading(true);
  }

  const {state, handleLogout} = useAuth();
  const user = state.user;

  const fields = [
    {
      name: 'motivation',
      label: 'Decrivez vos motivations',
      required: true,
      multiline: true,
    },
    {name: 'salaire', label: 'Prétention salariale'},
  ];

  const offre = props.data;

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
        paddingVertical: 0,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <Button onPress={() => props.goBack()}>Retour</Button>
        <Title style={{alignSelf: 'center'}}>
          {`[${offre.contract}] ${offre.name}`}
        </Title>
        <Subheading>{offre.begin}</Subheading>
        <Subheading>{offre.place}</Subheading>
        <Paragraph>{offre.description}</Paragraph>

        {offre.statut === 'new' ? (
          <Form {...formProps} />
        ) : (
          <Badge>{'Déjà postulé'}</Badge>
        )}
      </View>
    </ScrollView>
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
