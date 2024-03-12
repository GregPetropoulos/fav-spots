import { Image, Pressable, View, StyleSheet } from 'react-native';

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>{place.title}</View>
      <View>{place.address}</View>
    </Pressable>
  );
}
export default PlaceItem;
const styles = StyleSheet.create({});
