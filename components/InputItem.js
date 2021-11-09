import React from 'react';
import { View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function InputItem(props) {
  return (
    <View style={props.styles.container}>
      <TextInput
        style={props.styles.txt}
        placeholder="Things to do in life ..."
        onChangeText={props.handleChangeText}
        value={props.text}
      />
      <FontAwesome.Button
        style={props.styles.btn}
        name="plus"
        backgroundColor="#0000FF"
        onPress={props.handleAddPending}
      />
    </View>
  );
}
