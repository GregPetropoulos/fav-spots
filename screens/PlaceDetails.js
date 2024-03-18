import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import OutlineButton from '../components/UI/OutlineButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../utils/database';

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();

  const showOnMapHandler = () => {};
  const selectedPlaceId = route.params.placeId;
  
  useEffect(() => {
    const loadPlaceDetails = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      // updating title in the header once loading has finished
      navigation.setOptions({
        title: place.title
      });
    };
    loadPlaceDetails();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon='map' onPress={showOnMapHandler}>
          View On Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
const styles = StyleSheet.create({
  fallback:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  image: { height: '35%', minHeight: 300, width: '100%' },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});
