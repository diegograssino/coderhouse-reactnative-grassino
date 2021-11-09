import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import InputItem from './components/InputItem';
import Completed from './components/Completed';
import Pending from './components/Pending';

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
      <InputItem styles={styles} handleChangeText={handleChangeText} handleAddPending={handleAddPending} text={text} />
      <Pending
        styles={styles}
        pending={pending}
        handleAddCompleted={handleAddCompleted}
        handleRemovePending={handleRemovePending}
      />
      <Completed styles={styles} completed={completed} handleRemoveCompleted={handleRemoveCompleted} />
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
