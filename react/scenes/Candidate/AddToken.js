import React, {Component} from 'react';
import {Button, TextInput, View} from 'react-native-paper';

class AddToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      error: '',
    };
  }

  addToken() {
    if (!this.state.code.length) {
      this.setState({
        error: "Mais enfin, tu n'as rien écris !",
      });
    }
    //TODO : Faire la requête pour ajouter un token
  }

  render() {
    return (
      <>
        <TextInput
          label={this.state.error.length ? this.state.error : 'Code'}
          value={this.state.code}
          error={this.state.error.length}
          onChangeText={text => this.setState({text})}
        />
        <Button onPress={() => this.addToken()}>Ajouter</Button>
      </>
    );
  }
}

export default AddToken;
