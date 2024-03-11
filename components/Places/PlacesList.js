import { FlatList, View } from 'react-native';

function PlacesList({ places }) {
  const renderPlaces = () => {};

  
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderPlaces}
    />
  );
}
export default PlacesList;
