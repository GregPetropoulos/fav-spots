import { useState } from 'react';
import { TextInput, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('');
  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };
const savePlaceHandler =()=> {
  console.log('ONSUBMIUT')
}
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          onChangeText={changeTitleHandler}
        />
      </View>
      <ImagePicker />
      <LocationPicker/>
<Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}
export default PlaceForm;
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
});
