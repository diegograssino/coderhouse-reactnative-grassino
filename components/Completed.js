import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

const Completed = props => {
  return (
    <>
      <Text style={props.styles.titles}>Completed</Text>
      <FlatList
        style={props.styles.itemsContainer}
        data={props.completed}
        keyExtractor={item => item.id}
        renderItem={data => {
          return (
            <View style={props.styles.item} key={data.item.id}>
              <Text style={props.styles.txt}>{data.item.value}</Text>
              <FontAwesome.Button
                style={props.styles.btn}
                name="trash"
                backgroundColor="#FF0000"
                onPress={() => props.handleRemoveCompleted(data.item.id)}
              />
            </View>
          );
        }}
      ></FlatList>
    </>
  );
};

export default Completed;
