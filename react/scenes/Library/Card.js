import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Badge,
} from 'react-native-paper';
import React from 'react';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const MyComponent = ({item, onSelect}) => (
  <>
    <Card key={item.id}>
      {/* <Card.Cover style={{backgroundColor: 'blue'}} /> */}
      {/* <Card.Title title={item.name} subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Title>{item.name}</Title>
        {item.statut === 'done' ? <Badge>{'Postulé'}</Badge> : null}
        <Paragraph>{item.description.substring(0, 150) + '...'}</Paragraph>
      </Card.Content>

      <Card.Actions style={{alignSelf: 'center'}}>
        <Button onPress={() => onSelect(item)} mode="contained" icon="camera">
          Voir
        </Button>
      </Card.Actions>
    </Card>
    <Divider />
  </>
);

export default MyComponent;
