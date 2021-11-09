import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

export default function App() {
  const [text, setText] = useState('');
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleChangeText = value => {
    setText(value);
  };

  const handleAddPending = () => {
    if (text.length > 0) {
      const item = { value: text, id: Math.random().toString() };
      setPending([...pending, item]);
      setText('');
    }
  };

  const handleAddCompleted = toCompleted => {
    const item = { value: toCompleted.value, id: toCompleted.id };
    setCompleted([...completed, item]);
    handleRemovePending(toCompleted.id);
  };

  const handleRemovePending = pendingId => {
    setPending(pending.filter(item => item.id !== pendingId));
  };

  const handleRemoveCompleted = completedId => {
    setCompleted(completed.filter(item => item.id !== completedId));
  };

  return (
    <View style={styles.screen}>
      {/* Input */}
      <View style={styles.container}>
        <TextInput
          style={styles.txt}
          placeholder="Things to do in life ..."
          onChangeText={handleChangeText}
          value={text}
        />
        <FontAwesome.Button style={styles.btn} name="plus" backgroundColor="#0000FF" onPress={handleAddPending} />
        {/* Add
        </FontAwesome.Button> */}
      </View>

      <Text style={styles.titles}>Pending</Text>
      {/* Pending */}
      <FlatList
        style={styles.itemsContainer}
        data={pending}
        keyExtractor={item => item.id}
        renderItem={data => {
          return (
            <View style={styles.item} key={data.item.id}>
              <Text style={styles.txt}>{data.item.value}</Text>
              <FontAwesome.Button
                style={styles.btn}
                name="check"
                backgroundColor="#008000"
                onPress={() => handleAddCompleted(data.item)}
              />
              <View style={styles.btnSpacer}></View>
              <FontAwesome.Button
                style={styles.btn}
                name="trash"
                backgroundColor="#FF0000"
                onPress={() => handleRemovePending(data.item.id)}
              />
            </View>
          );
        }}
      ></FlatList>

      {/* Completed */}
      <Text style={styles.titles}>Completed</Text>

      <FlatList
        style={styles.itemsContainer}
        data={completed}
        keyExtractor={item => item.id}
        renderItem={data => {
          return (
            <View style={styles.item} key={data.item.id}>
              <Text style={styles.txt}>{data.item.value}</Text>
              <FontAwesome.Button
                style={styles.btn}
                name="trash"
                backgroundColor="#FF0000"
                onPress={() => handleRemoveCompleted(data.item.id)}
              />
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 70,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  btnSpacer: {
    width: 6,
  },
  itemsContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: 'silver',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingStart: 10,
    paddingVertical: 3,
    paddingEnd: 3,
    borderRadius: 5,
  },
  titles: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  txt: {
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    flex: 1,
    marginRight: 20,
  },
  btn: { paddingEnd: 0, paddingStart: 10 },
});
