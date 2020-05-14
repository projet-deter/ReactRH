import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, Button} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useAuth} from '../../provider';
import Card from '../Library/Card';
import Offer from './Offer';

const Tab = createBottomTabNavigator();

export default function Offers(props) {
  const {navigate} = props.navigation;

  const [offre, setOffre] = useState(null);
  const {state, handleLogout} = useAuth();
  const user = state.user;

  function onSelect(item) {
    setOffre(item);
  }

  function goBack() {
    setOffre(null);
  }

  const offres = [
    {
      id: 1,
      name: 'Développeur web',
      company:
        'SOS Accessoire est le leader Français de la vente en ligne de pièces détachées pour appareils électroménager. Nous donnons à nos clients les moyens de réparer eux-même les appareils',
      description:
        'Membre de l’équipe à part entière et encadré par le Responsable Web Marketing et le Content Manager, vous aurez pour mission de nous aider à créer et diffuser nos contenus sur nos différents sites web et réseaux sociaux.**Vos tâches seront variées et enrichissantes (loin du café-photocopie) :**En conformité avec la charte graphique de SOS Accessoire, vous participerez à la :* Production de divers support de communication (flyers, affiche, bannières...)* Graphisme E-mailings / newsletter / pages web* Réalisation de bannières web (FB , site, Adwords..)* Shooting photo* Mises en conformité de documents existants',
      begin: '13-05-2020 à 19:20:03',
      contract: 'Stage',
      place: '75012 - Paris',
    },
    {
      id: 2,
      name: 'Développeur web',
      company:
        'SOS Accessoire est le leader Français de la vente en ligne de pièces détachées pour appareils électroménager. Nous donnons à nos clients les moyens de réparer eux-même les appareils',
      description:
        'Membre de l’équipe à part entière et encadré par le Responsable Web Marketing et le Content Manager, vous aurez pour mission de nous aider à créer et diffuser nos contenus sur nos différents sites web et réseaux sociaux.**Vos tâches seront variées et enrichissantes (loin du café-photocopie) :**En conformité avec la charte graphique de SOS Accessoire, vous participerez à la :* Production de divers support de communication (flyers, affiche, bannières...)* Graphisme E-mailings / newsletter / pages web* Réalisation de bannières web (FB , site, Adwords..)* Shooting photo* Mises en conformité de documents existants',
      begin: '13-05-2020 à 19:20:03',
      contract: 'Stage',
      place: '75012 - Paris',
    },
    {
      id: 3,
      name: 'Développeur web',
      company:
        'SOS Accessoire est le leader Français de la vente en ligne de pièces détachées pour appareils électroménager. Nous donnons à nos clients les moyens de réparer eux-même les appareils',
      description:
        'Membre de l’équipe à part entière et encadré par le Responsable Web Marketing et le Content Manager, vous aurez pour mission de nous aider à créer et diffuser nos contenus sur nos différents sites web et réseaux sociaux.**Vos tâches seront variées et enrichissantes (loin du café-photocopie) :**En conformité avec la charte graphique de SOS Accessoire, vous participerez à la :* Production de divers support de communication (flyers, affiche, bannières...)* Graphisme E-mailings / newsletter / pages web* Réalisation de bannières web (FB , site, Adwords..)* Shooting photo* Mises en conformité de documents existants',
      begin: '13-05-2020 à 19:20:03',
      contract: 'Stage',
      place: '75012 - Paris',
    },
  ];

  if (offre) return <Offer goBack={() => goBack()} data={offre} />;

  return (
    <FlatList
      data={offres}
      renderItem={({item}) => <Card item={item} onSelect={i => onSelect(i)} />}
    />
  );
}
