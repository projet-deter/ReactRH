import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import {View, ScrollView} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import Form, {TYPES} from 'react-native-basic-form';

import DocumentPicker from 'react-native-document-picker';
import {useAuth} from '../provider';

export default function Home(props) {
  const [loading, setLoading] = useState(false);
  function onSubmit(state) {
    setLoading(true);
  }

  const {state} = useAuth();
  const user = state.user;

  const fields = [
    {name: 'firstname', label: 'Prénom'},
    {name: 'lastname', label: 'Nom'},
    {name: 'image', label: 'Profile Image', type: TYPES.Image},
    {name: 'birthdate', label: 'Date de naissance', type: TYPES.Date},
  ];

  async function showImagePicker() {
    console.log('try to pickup image');
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      console.log(err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  let formProps = {
    title: 'Valider',
    fields,
    onSubmit,
    loading,
    initialData: {
      ...user,
      image:
        'http://res.cloudinary.com/ddv9bxonm/image/upload/v1585512850/ib9c0dml4dlksi8xgvob.jpg',
    },
    showImagePicker: showImagePicker,
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
          <Avatar.Image
            size={72}
            style={{alignSelf: 'center'}}
            source={
              'http://res.cloudinary.com/ddv9bxonm/image/upload/v1585512850/ib9c0dml4dlksi8xgvob.jpg'
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
