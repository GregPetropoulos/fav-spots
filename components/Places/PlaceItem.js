import { Image, Pressable, Text, StyleSheet } from 'react-native';

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <Text>{place.title}</Text>
      <Text>{place.address}</Text>
    </Pressable>
  );
}
export default PlaceItem;
const styles = StyleSheet.create({
  text:{},
  
});
