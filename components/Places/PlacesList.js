import { FlatList, Text, View,StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallbackText}>No Places available - start adding some</Text>
      </View>
    );
  }

  return (
    <FlatList
    style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}
export default PlacesList;
const styles = StyleSheet.create({
  list:{margin:24},
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  fallbackText:{
    fontSize:16,
    color:Colors.primary200
  }
});
