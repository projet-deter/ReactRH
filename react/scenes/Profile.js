import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import {View, ScrollView} from 'react-native';
import {Avatar, Title, Subheading} from 'react-native-paper';
import Form, {TYPES} from 'react-native-basic-form';
import * as api from '../services/auth';
import {useAuth} from '../provider';
import DocumentPicker from 'react-native-document-picker';

export default function Profile(props) {
  const [loading, setLoading] = useState(false);
  const {state, updateUser} = useAuth();
  const {navigation} = props;

  async function onSubmit(data) {
    setLoading(true);

    try {
      let response = await api.updateProfile(state.user._id, data);
      updateUser(response.user);

      setLoading(false);

      navigation.goBack();
    } catch (error) {
      setLoading(false);
    }
  }

  const user = state.user;

  const options = [{label: 'Female', value: 1}, {label: 'Male', value: 2}];

  const fields = [
    {
      name: 'username',
      label: 'Username',
      //// value: user.username,
    },
    {
      name: 'birthdate',
      label: 'Age',
      type: TYPES.Number,
      //  value: user.age,
    },
    {
      name: 'sexe',
      label: 'Sexe',
      required: true,
      type: TYPES.Dropdown,
      options: options,
      //  value: user.sexe,
    },
    {
      name: 'adresse',
      label: 'Adresse',
      //  value: user.adresse,
    },
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

          <Title>{`${user.username} `}</Title>
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
